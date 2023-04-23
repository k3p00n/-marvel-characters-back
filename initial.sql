CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE gender (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL
);

INSERT INTO gender (id, name)
VALUES 
  (uuid_generate_v4(), 'male'),
  (uuid_generate_v4(), 'female'),
  (uuid_generate_v4(), 'other');

CREATE TABLE character (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  gender_id UUID NOT NULL REFERENCES gender(id),
  age INTEGER NOT NULL,
  film_status BOOLEAN NOT NULL,
  UNIQUE (name)
);

CREATE TABLE accomplice (
  character_id UUID NOT NULL REFERENCES character(id) ON DELETE CASCADE,
  accomplice_id UUID NOT NULL REFERENCES character(id) ON DELETE CASCADE,
  PRIMARY KEY (character_id, accomplice_id)
);

CREATE TABLE enemy (
  character_id UUID NOT NULL REFERENCES character(id) ON DELETE CASCADE,
  enemy_id UUID NOT NULL REFERENCES character(id) ON DELETE CASCADE,
  PRIMARY KEY (character_id, enemy_id)
);

CREATE OR REPLACE FUNCTION add_reverse_enemy_relationship()
  RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO enemy (character_id, enemy_id)
  VALUES (NEW.enemy_id, NEW.character_id)
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_reverse_enemy_relationship_trigger
  AFTER INSERT ON enemy
  FOR EACH ROW
  EXECUTE FUNCTION add_reverse_enemy_relationship();

CREATE OR REPLACE FUNCTION remove_reverse_enemy_relationship()
  RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM enemy
  WHERE character_id = OLD.enemy_id AND enemy_id = OLD.character_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER remove_reverse_enemy_relationship_trigger
  AFTER DELETE ON enemy
  FOR EACH ROW
  EXECUTE FUNCTION remove_reverse_enemy_relationship();

CREATE OR REPLACE FUNCTION add_reverse_accomplice_relationship()
  RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO accomplice (character_id, accomplice_id)
  VALUES (NEW.accomplice_id, NEW.character_id)
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_reverse_accomplice_relationship_trigger
  AFTER INSERT ON accomplice
  FOR EACH ROW
  EXECUTE FUNCTION add_reverse_accomplice_relationship();

CREATE OR REPLACE FUNCTION remove_reverse_accomplice_relationship()
  RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM accomplice
  WHERE character_id = OLD.accomplice_id AND accomplice_id = OLD.character_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER remove_reverse_accomplice_relationship_trigger
  AFTER DELETE ON accomplice
  FOR EACH ROW
  EXECUTE FUNCTION remove_reverse_accomplice_relationship();
