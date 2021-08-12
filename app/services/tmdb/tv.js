import fetchTmdb from "@/lib/fetchTmdb";

export const getPopularTv = (page) => {
  return fetchTmdb("GET", "/tv/popular", { page });
};
