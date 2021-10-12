import fetchTmdb from "@/lib/fetchTmdb";

import { appendMediaTypeTv } from "@/transforms/api";

export const getPopularTv = (page) => {
  return fetchTmdb("GET", "/tv/popular", { page }).then(appendMediaTypeTv);
};

export const getTvByGenre = (genreId, page) => {
  return fetchTmdb("GET", `/discover/tv`, {
    with_genres: genreId,
    page,
  }).then(appendMediaTypeTv);
};

export const getTvDetail = (tvId) => {
  return fetchTmdb("GET", `/tv/${tvId}`, {
    append_to_response: "credits,videos,images",
  });
};
