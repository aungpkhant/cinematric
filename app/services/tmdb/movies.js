import fetchTmdb from "@/lib/fetchTmdb";

import { appendMediaTypeMovie } from "@/transforms/api";

export const getPopularMovies = (page) => {
  return fetchTmdb("GET", "/movie/popular", { page }).then(
    appendMediaTypeMovie
  );
};

export const getMovieDetail = (movieId) => {
  return fetchTmdb("GET", `/movie/${movieId}`, {
    append_to_response: "credits,videos,images",
  });
};

export const getMoviesByGenre = (genreId, page) => {
  return fetchTmdb("GET", `/discover/movie`, {
    with_genres: genreId,
    page,
  }).then(appendMediaTypeMovie);
};
