import { TV_GENRES } from "@/constants/tmdb";

export const mapTvGenreIdToGenre = (genre_id) => {
  try {
    return TV_GENRES[genre_id].value;
  } catch (err) {
    console.error(err);
    return "??";
  }
};
