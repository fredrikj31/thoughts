CREATE TABLE IF NOT EXISTS posts (
  id varchar(255) NOT NULL UNIQUE PRIMARY KEY,
  user_id varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id varchar(255) NOT NULL UNIQUE PRIMARY KEY,
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL
);