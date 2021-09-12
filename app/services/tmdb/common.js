import fetchTmdb from "@/lib/fetchTmdb";
import { transformFilterMoiveAndTvFromResults } from "@/transforms/api";

export const searchTmdb = (query) => {
  return fetchTmdb("GET", "/search/multi", {
    query: query,
  }).then(transformFilterMoiveAndTvFromResults);
};
