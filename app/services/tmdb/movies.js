import fetchTmdb from "@/lib/fetchTmdb";

// https://api.themoviedb.org/3/movie/popular?api_key=a07dd8102d4438b1abd37944d568cc86&language=en-US&page=1

export const getPopularMovies = (page) => {
  return fetchTmdb("GET", "/movie/popular", { page });
};
