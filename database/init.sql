--- gender enum
CREATE TYPE gender AS ENUM (
  'MALE',
  'FEMALE',
  'PREFER_NOT_TO_SAY'
);

--- friend request status enum
CREATE TYPE friend_request_status AS ENUM (
  'PENDING',
  'ACCEPTED',
  'DECLINED'
);

--- users table
CREATE TABLE IF NOT EXISTS users (
  id uuid NOT NULL,
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
  id uuid NOT NULL,
  user_id uuid NOT NULL,
  expires_at timestamp NOT NULL
);

ALTER TABLE ONLY refresh_tokens ADD CONSTRAINT refresh_tokens_id_primary_key PRIMARY KEY (id);
ALTER TABLE ONLY refresh_tokens ADD CONSTRAINT refresh_tokens_id_unique_key UNIQUE (id);
ALTER TABLE ONLY refresh_tokens ADD CONSTRAINT refresh_tokens_user_id_references FOREIGN KEY(user_id) REFERENCES users(id);
---

--- friends table
CREATE TABLE IF NOT EXISTS friends (
  id uuid NOT NULL,
  user_id uuid NOT NULL,
  friend_id uuid NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp,
  deleted_at timestamp
);

ALTER TABLE ONLY friends ADD CONSTRAINT friends_id_primary_key PRIMARY KEY (id);
ALTER TABLE ONLY friends ADD CONSTRAINT friends_user_id_references FOREIGN KEY(user_id) REFERENCES users(id);
ALTER TABLE ONLY friends ADD CONSTRAINT friends_friend_id_references FOREIGN KEY(friend_id) REFERENCES users(id);
---

--- friend requests table
CREATE TABLE IF NOT EXISTS friend_requests (
  id uuid NOT NULL,
  sender_id uuid NOT NULL,
  receiver_id uuid NOT NULL,
  status friend_request_status NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp,
  deleted_at timestamp
);

ALTER TABLE ONLY friend_requests ADD CONSTRAINT friend_requests_id_primary_key PRIMARY KEY (id);
ALTER TABLE ONLY friend_requests ADD CONSTRAINT friend_requests_sender_id_references FOREIGN KEY(sender_id) REFERENCES users(id);
ALTER TABLE ONLY friend_requests ADD CONSTRAINT friend_requests_receiver_id_references FOREIGN KEY(receiver_id) REFERENCES users(id);
---

--- posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid NOT NULL,
  user_id uuid NOT NULL,
  content text NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp,
  deleted_at timestamp
);

ALTER TABLE ONLY posts ADD CONSTRAINT posts_id_primary_key PRIMARY KEY (id);
ALTER TABLE ONLY posts ADD CONSTRAINT posts_user_id_references FOREIGN KEY(user_id) REFERENCES users(id);
---

--- likes table
CREATE TABLE IF NOT EXISTS likes (
  id uuid NOT NULL,
  post_id uuid NOT NULL,
  user_id uuid NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp,
  deleted_at timestamp
);

ALTER TABLE ONLY likes ADD CONSTRAINT likes_id_primary_key PRIMARY KEY (id);
ALTER TABLE ONLY likes ADD CONSTRAINT likes_post_id_references FOREIGN KEY(post_id) REFERENCES posts(id);
ALTER TABLE ONLY likes ADD CONSTRAINT likes_user_id_references FOREIGN KEY(user_id) REFERENCES users(id);
ALTER TABLE ONLY likes ADD CONSTRAINT likes_post_id_user_id_unique_key UNIQUE (post_id, user_id);
---