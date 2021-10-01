create extension if not exists pgcrypto;

create table users (
  id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  email VARCHAR (255) NOT NULL UNIQUe,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);

create index idx_users_username ON users(username);