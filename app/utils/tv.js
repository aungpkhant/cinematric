import { TV_GENRES } from "@/constants/tmdb";

export const mapTvGenreIdToGenre = (genre_id) => TV_GENRES[genre_id].value;
