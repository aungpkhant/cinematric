create table media_lists (
  id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  user_id uuid NOT NULL,
  name TEXT NOT NULL,
  list_type TEXT CHECK (list_type in ('default', 'custom')),
  media_type TEXT CHECK (media_type IN ('tv', 'movie')),
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
        REFERENCES users(id)
            ON DELETE CASCADE
);

create index idx_media_lists_user_id ON media_lists(user_id);