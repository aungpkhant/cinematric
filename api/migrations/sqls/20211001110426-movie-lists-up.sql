create table movie_lists (
  id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  user_id uuid,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
        REFERENCES users(id)
            ON DELETE CASCADE
);

create index idx_movie_lists_user_id ON movie_lists(user_id);