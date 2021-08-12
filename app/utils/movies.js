import { MOVIE_GENRES } from "@/constants/tmdb";

export const mapMovieGenreIdToGenre = (genre_id) =>
  MOVIE_GENRES[genre_id].value;

export const formatRuntime = (minutes) => {
  const runtime_hours = Math.floor(minutes / 60);
  const runtime_minutes = minutes % 60;

  const runtime_hours_string = runtime_hours === 0 ? "" : `${runtime_hours}h`;

  return `${runtime_hours_string} ${runtime_minutes}m`;
};
