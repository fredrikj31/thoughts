# Database Structure

This is a chart showing the current database structure and which relationships there are between the tables

```mermaid
erDiagram
  users {
    id uuid PK
    username varchar(255)
    email varchar(255)
    password varchar(255)
    password_salt varchar(255)
    first_name varchar(255)
    last_name varchar(255)
    birth_date varchar(255)
    gender varchar(255) "MALE | FEMALE | PREFER_NOT_TO_SAY"
    created_at timestamp
    updated_at timestamp "nullable"
    deleted_at timestamp "nullable"
  }

  refresh_tokens {
    id uuid PK
    user_id uuid FK
    expires_at timestamp
  }

  friends {
    id uuid PK
    user_id uuid FK
    friend_id uuid FK
    created_at timestamp
    updated_at timestamp "nullable"
    deleted_at timestamp "nullable"
  }

  friend_requests {
    id uuid PK
    sender_id uuid FK
    receiver_id uuid FK
    status varchar(255) "PENDING | ACCEPTED | DECLINED"
    created_at timestamp
    updated_at timestamp "nullable"
    deleted_at timestamp "nullable"
  }

  posts {
    id uuid PK
    username varchar(255)
    email varchar(255)
  }

  users ||--|{ refresh_tokens : user_id
  users ||--|{ friends : user_id
  users ||--|{ friends : friend_id
  users ||--|{ friend_requests : sender_id
  users ||--|{ friend_requests : receiver_id
```
