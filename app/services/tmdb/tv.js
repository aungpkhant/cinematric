import fetchTmdb from "@/lib/fetchTmdb";

export const getPopularTv = (page) => {
  return fetchTmdb("GET", "/tv/popular", { page });
};

export const getTvByGenre = (genreId, page) => {
  return fetchTmdb("GET", `/discover/tv`, {
    with_genres: genreId,
    page,
  });
};
