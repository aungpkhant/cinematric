import fetchCinematric from "@/lib/fetchCinematric";

export const signup = (data) => {
  return fetchCinematric("POST", "/users/signup", data);
};

export const signin = (data) => {
  return fetchCinematric("POST", "/users/signin", data);
};

export const signout = () => {
  return fetchCinematric("DELETE", "/users/signout");
};
