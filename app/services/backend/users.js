import fetchCinematric from "@/lib/fetchCinematric";

export const getMyProfile = () => {
  return fetchCinematric("GET", "/users/me");
};
