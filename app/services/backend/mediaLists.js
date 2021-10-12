import fetchCinematric from "@/lib/fetchCinematric";

export const getMyMovieList = () => {
  return fetchCinematric("GET", "/lists/my-movie-list");
};

export const addToMediaList = (media_id, media_type, media_list_id) => {
  return fetchCinematric("POST", "/lists/media-listing", {
    media_id,
    media_type,
    media_list_id,
  });
};
