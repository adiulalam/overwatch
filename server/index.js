import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";
import pg from "pg";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const webDir = path.join(root, "web-build");
const port = Number(process.env.PORT ?? 3000);
const auth0Domain = process.env.AUTH0_DOMAIN;
const auth0Audience = process.env.AUTH0_AUDIENCE ?? "hasura";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const resources = {
	heroes: {
		table: "overwatch.hero",
		key: "hero_uuid",
		columns: ["hero_uuid", "name", "hero_image", "type", "difficulty", "description"],
		deletable: false,
	},
	abilities: {
		table: "overwatch.ability",
		key: "ability_uuid",
		columns: ["ability_uuid", "name", "type", "ability_image", "fk_hero_uuid"],
		deletable: true,
	},
	"map-modes": {
		table: "overwatch.map_mode",
		key: "map_mode_uuid",
		columns: ["map_mode_uuid", "type", "description", "index"],
		deletable: false,
	},
	maps: {
		table: "overwatch.map",
		key: "map_uuid",
		columns: ["map_uuid", "name", "map_image", "fk_map_mode_uuid"],
		deletable: true,
	},
};

const dataQuery = `
	SELECT json_build_object(
		'Heroes', COALESCE((
			SELECT json_agg(json_build_object(
				'hero_uuid', h.hero_uuid,
				'name', h.name,
				'hero_image', h.hero_image,
				'type', h.type,
				'difficulty', h.difficulty,
				'description', h.description,
				'abilities', COALESCE((
					SELECT json_agg(json_build_object(
						'ability_uuid', a.ability_uuid,
						'fk_hero_uuid', a.fk_hero_uuid,
						'name', a.name,
						'type', a.type,
						'ability_image', a.ability_image
					))
					FROM overwatch.ability a
					WHERE a.fk_hero_uuid = h.hero_uuid
				), '[]'::json)
			) ORDER BY h.name COLLATE overwatch.natural)
			FROM overwatch.hero h
		), '[]'::json),
		'Maps', COALESCE((
			SELECT json_agg(json_build_object(
				'map_mode_uuid', mm.map_mode_uuid,
				'type', mm.type,
				'description', mm.description,
				'maps', COALESCE((
					SELECT json_agg(json_build_object(
						'map_uuid', m.map_uuid,
						'name', m.name,
						'map_image', m.map_image
					))
					FROM overwatch.map m
					WHERE m.fk_map_mode_uuid = mm.map_mode_uuid
				), '[]'::json)
			) ORDER BY mm.index)
			FROM overwatch.map_mode mm
		), '[]'::json)
	) AS data
`;

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function migrate() {
	for (let attempt = 1; ; attempt++) {
		try {
			await pool.query(await readFile(path.join(root, "db/schema.sql"), "utf8"));
			break;
		} catch (error) {
			if (attempt >= 15) throw error;
			console.log(`Waiting for the database (${error.code ?? error.message})...`);
			await sleep(2000);
		}
	}

	const { rows } = await pool.query("SELECT count(*)::int AS heroes FROM overwatch.hero");
	if (rows[0].heroes === 0) {
		await pool.query(await readFile(path.join(root, "db/seed.sql"), "utf8"));
		console.log("Database was empty, loaded db/seed.sql");
	}
}

const jwks = auth0Domain ? createRemoteJWKSet(new URL(`https://${auth0Domain}/.well-known/jwks.json`)) : null;

async function requireAdmin(req, res, next) {
	const token = req.get("authorization")?.match(/^Bearer (.+)$/)?.[1];
	if (!token || !jwks) return res.status(401).json({ error: "Login required" });

	try {
		const { payload } = await jwtVerify(token, jwks, {
			issuer: `https://${auth0Domain}/`,
			audience: auth0Audience,
			algorithms: ["RS256"],
		});
		const roles = payload["https://hasura.io/jwt/claims"]?.["x-hasura-allowed-roles"] ?? [];
		if (!roles.includes("user")) return res.status(403).json({ error: "Not allowed" });
		next();
	} catch {
		return res.status(401).json({ error: "Invalid or expired login" });
	}
}

function resourceFor(req, res) {
	const resource = resources[req.params.resource];
	if (!resource) {
		res.status(404).json({ error: "Unknown resource" });
		return null;
	}
	return resource;
}

function pickValues(resource, body, res) {
	if (!body || typeof body !== "object" || Array.isArray(body)) {
		res.status(400).json({ error: "Expected a JSON object" });
		return null;
	}
	const keys = Object.keys(body);
	const unknown = keys.filter((key) => !resource.columns.includes(key));
	if (keys.length === 0 || unknown.length > 0) {
		res.status(400).json({ error: unknown.length ? `Unknown fields: ${unknown.join(", ")}` : "No fields given" });
		return null;
	}
	return keys.map((key) => [key, body[key]]);
}

function sendDatabaseError(error, res) {
	if (["23502", "23503", "22P02", "23505"].includes(error.code)) {
		return res.status(400).json({ error: error.message });
	}
	console.error(error);
	return res.status(500).json({ error: "Database error" });
}

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", async (req, res) => {
	await pool.query("SELECT 1");
	res.json({ ok: true });
});

app.get("/api/data", async (req, res) => {
	const { rows } = await pool.query(dataQuery);
	res.json(rows[0].data);
});

app.post("/api/:resource", requireAdmin, async (req, res) => {
	const resource = resourceFor(req, res);
	const entries = resource && pickValues(resource, req.body, res);
	if (!entries) return;

	const columns = entries.map(([key]) => `"${key}"`).join(", ");
	const placeholders = entries.map((_, i) => `$${i + 1}`).join(", ");
	try {
		const { rows } = await pool.query(
			`INSERT INTO ${resource.table} (${columns}) VALUES (${placeholders}) RETURNING "${resource.key}"`,
			entries.map(([, value]) => value)
		);
		res.status(201).json(rows[0]);
	} catch (error) {
		sendDatabaseError(error, res);
	}
});

app.patch("/api/:resource/:uuid", requireAdmin, async (req, res) => {
	const resource = resourceFor(req, res);
	if (!resource) return;
	if (!uuidPattern.test(req.params.uuid)) return res.status(400).json({ error: "Invalid id" });
	const entries = pickValues(resource, req.body, res);
	if (!entries) return;

	const assignments = entries.map(([key], i) => `"${key}" = $${i + 1}`).join(", ");
	try {
		const { rows } = await pool.query(
			`UPDATE ${resource.table} SET ${assignments} WHERE "${resource.key}" = $${entries.length + 1} RETURNING "${resource.key}"`,
			[...entries.map(([, value]) => value), req.params.uuid]
		);
		if (rows.length === 0) return res.status(404).json({ error: "Not found" });
		res.json(rows[0]);
	} catch (error) {
		sendDatabaseError(error, res);
	}
});

app.delete("/api/:resource/:uuid", requireAdmin, async (req, res) => {
	const resource = resourceFor(req, res);
	if (!resource) return;
	if (!resource.deletable) return res.status(405).json({ error: "Delete is not supported for this resource" });
	if (!uuidPattern.test(req.params.uuid)) return res.status(400).json({ error: "Invalid id" });

	try {
		const { rows } = await pool.query(
			`DELETE FROM ${resource.table} WHERE "${resource.key}" = $1 RETURNING "${resource.key}"`,
			[req.params.uuid]
		);
		if (rows.length === 0) return res.status(404).json({ error: "Not found" });
		res.json(rows[0]);
	} catch (error) {
		sendDatabaseError(error, res);
	}
});

app.use("/api", (req, res) => res.status(404).json({ error: "Not found" }));

app.use(express.static(webDir));
app.use((req, res, next) => {
	if (req.method !== "GET" && req.method !== "HEAD") return next();
	res.sendFile(path.join(webDir, "index.html"));
});

app.use((error, req, res, next) => {
	if (error.type === "entity.parse.failed") return res.status(400).json({ error: "Invalid JSON" });
	console.error(error);
	res.status(500).json({ error: "Server error" });
});

await migrate();

const server = app.listen(port, () => console.log(`Overwatch listening on port ${port}`));

for (const signal of ["SIGTERM", "SIGINT"]) {
	process.on(signal, () => {
		server.close(() => pool.end().then(() => process.exit(0)));
	});
}
