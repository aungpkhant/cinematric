import fetchTmdb from "@/lib/fetchTmdb";

export const searchTmdb = (query) => {
  return fetchTmdb("GET", "/search/multi", {
    query: query,
  });
};
