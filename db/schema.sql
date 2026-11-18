CREATE SCHEMA IF NOT EXISTS overwatch;

CREATE COLLATION IF NOT EXISTS overwatch.natural (provider = icu, locale = 'en-u-ka-shifted');

CREATE TABLE IF NOT EXISTS overwatch.hero (
	hero_uuid uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	name text NOT NULL,
	hero_image text NOT NULL,
	type text NOT NULL,
	difficulty integer NOT NULL,
	description text NOT NULL
);

CREATE TABLE IF NOT EXISTS overwatch.ability (
	ability_uuid uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	name text NOT NULL,
	type text NOT NULL,
	ability_image text NOT NULL,
	fk_hero_uuid uuid NOT NULL REFERENCES overwatch.hero (hero_uuid)
);

CREATE TABLE IF NOT EXISTS overwatch.map_mode (
	map_mode_uuid uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	type text NOT NULL,
	description text NOT NULL,
	index integer NOT NULL
);

CREATE TABLE IF NOT EXISTS overwatch.map (
	map_uuid uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	name text NOT NULL,
	map_image text NOT NULL,
	fk_map_mode_uuid uuid NOT NULL REFERENCES overwatch.map_mode (map_mode_uuid)
);
