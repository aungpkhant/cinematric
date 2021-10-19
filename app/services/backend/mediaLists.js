import fetchCinematric from "@/lib/fetchCinematric";

export const getMyMovieList = (params) => {
  return fetchCinematric("GET", "/lists/my-movie-list", params);
};

export const getMyTvList = (params) => {
  return fetchCinematric("GET", "/lists/my-tv-list", params);
};

export const addToMediaList = (media_id, media_type, media_list_id) => {
  return fetchCinematric("POST", "/lists/media-listing", {
    media_id,
    media_type,
    media_list_id,
  });
};

export const deleteFromMediaList = (listing_id) => {
  return fetchCinematric("DELETE", `/lists/media-listing/${listing_id}`);
};

export const editMediaListing = (listing_id, status, remark) => {
  return fetchCinematric("PUT", `/lists/media-listing/${listing_id}`, {
    status,
    remark,
  });
};
