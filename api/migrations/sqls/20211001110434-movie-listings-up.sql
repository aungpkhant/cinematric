create table movie_listings (
  id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  movie_list_id uuid REFERENCES movie_lists(id),
  movie_id INTEGER NOT NULL,
  movie JSON NOT NULL,
  UNIQUE (movie_id, movie_list_id)
);
