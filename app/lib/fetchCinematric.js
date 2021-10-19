import axios from "axios";
import config from "@/config/index";

const cinematricAxios = axios.create({
  baseURL: config.api.ENDPOINT,
  headers: { Accept: "application/json" },
  withCredentials: true,
});

const fetchCinematric = (method, url, data) => {
  let axiosConfig = { method: method, url };
  if (method.toLowerCase() === "get") {
    axiosConfig = { ...axiosConfig, params: data };
  } else {
    axiosConfig = { ...axiosConfig, data };
  }

  return cinematricAxios(axiosConfig);
};

export default fetchCinematric;
