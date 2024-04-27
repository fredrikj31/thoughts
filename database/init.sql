-- gender enum
CREATE TYPE gender AS ENUM (
  'MALE',
  'FEMALE',
  'PREFER_NOT_TO_SAY'
);

--- users table
CREATE TABLE IF NOT EXISTS users (
  id varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  password_salt varchar(255) NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  birth_date date NOT NULL,
  gender gender NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp,
  deleted_at timestamp
);

ALTER TABLE ONLY users ADD CONSTRAINT users_id_primary_key PRIMARY KEY (id);
ALTER TABLE ONLY users ADD CONSTRAINT users_username_unique_key UNIQUE (username);
ALTER TABLE ONLY users ADD CONSTRAINT users_email_unique_key UNIQUE (email);
---

--- refresh token table
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id varchar(255) NOT NULL,
  user_id varchar(255) NOT NULL,
  expires_at timestamp NOT NULL
);

ALTER TABLE ONLY refresh_tokens ADD CONSTRAINT refresh_tokens_id_primary_key PRIMARY KEY (id);
ALTER TABLE ONLY refresh_tokens ADD CONSTRAINT refresh_tokens_id_unique_key UNIQUE (id);
ALTER TABLE ONLY refresh_tokens ADD CONSTRAINT refresh_tokens_user_id_references FOREIGN KEY(user_id) REFERENCES users(id);
---

-- posts table
CREATE TABLE IF NOT EXISTS posts (
  id varchar(255) NOT NULL UNIQUE PRIMARY KEY,
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL
);