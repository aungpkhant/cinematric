create table media_listings (
  id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  media_list_id uuid REFERENCES media_lists(id) ON DELETE CASCADE,
  media_id INTEGER NOT NULL,
  media_type TEXT CHECK (media_type IN ('tv', 'movie')),
  status TEXT CHECK (status IN ('watching', 'plan_to_watch', 'completed', 'dropped')),
  item JSON NOT NULL,
  UNIQUE (media_id, media_list_id, media_type)
);