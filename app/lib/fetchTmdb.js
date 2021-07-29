import axios from "axios";

const defaultParams = {
  api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
};

// https://css-tricks.com/stay-dry-using-axios-for-api-requests/
const tmdbAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: { Accept: "application/json" },
  params: defaultParams,
});

const fetchTmdb = (method, url, data) => {
  let axiosConfig = { method: method, url };
  if (method.toLowerCase() === "get") {
    axiosConfig = { ...axiosConfig, params: data };
  } else {
    axiosConfig = { ...axiosConfig, data };
  }

  return tmdbAxios(axiosConfig);
};

export default fetchTmdb;
