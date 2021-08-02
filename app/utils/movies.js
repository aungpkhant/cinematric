import { MOVIE_GENRES } from "@/constants/tmdb";

export const mapGenreIdToGenre = (genre_id) => MOVIE_GENRES[genre_id].value;

export const formatRuntime = (minutes) => {
  const runtime_hours = Math.floor(minutes / 60) || "";
  const runtime_minutes = minutes % 60;

  return `${runtime_hours}h ${runtime_minutes}m`;
};
