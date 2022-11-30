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

