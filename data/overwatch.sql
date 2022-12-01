CREATE SCHEMA IF NOT EXISTS overwatch;
CREATE TABLE overwatch.hero(
	hero_uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
	name text NOT NULL,
	hero_image text NOT NULL,
    type text NOT NULL,
    difficulty integer NOT NULL,
    description text NOT NULL
);

CREATE TABLE overwatch.ability (
	ability_uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
	name text NOT NULL,
	type text NOT NULL,
	ability_image text NOT NULL,
	fk_hero_uuid UUID NOT NULL,
	FOREIGN KEY (fk_hero_uuid ) REFERENCES overwatch.hero (hero_uuid)
);

CREATE TABLE overwatch.map_mode (
	map_mode_uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
	type text NOT NULL,
	description text NOT NULL,
	index integer NOT NULL,
);

CREATE TABLE overwatch.map (
	map_uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
	name text NOT NULL,
	map_image text NOT NULL,
	fk_map_mode_uuid UUID NOT NULL,
	FOREIGN KEY (fk_map_mode_uuid ) REFERENCES overwatch.map_mode (map_mode_uuid)
);