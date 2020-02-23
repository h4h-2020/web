CREATE TABLE social_services (
  ID SERIAL PRIMARY KEY,
  title TEXT,
  fee TEXT,
  location TEXT,
  required_documents TEXT,
  description TEXT,
  attributes_id INTEGER,
  link TEXT
);

CREATE TABLE tags (
  ID SERIAL PRIMARY KEY,
  name TEXT
);

CREATE TABLE social_services_tags (
  social_services_id INTEGER,
  tags_id INTEGER
);

CREATE TABLE attributes (
  citizenship BOOLEAN,
  ssn BOOLEAN,
  residency TEXT,
  languages TEXT,
  income_level TEXT,
  children BOOLEAN,
  BIRTHDATE TEXT,
  AGE TEXT,
  disability BOOLEAN,
  medical_history TEXT,
  education TEXT
);

ALTER TABLE users ADD COLUMN attributes_id INTEGER;
