// Transformations for api responses.
// These functions are intended to restrucuture/append to api responses.

export const appendMediaTypeMovie = (res) => {
  if (res?.data?.results) {
    res.data.results = res.data.results.map((item) => ({
      ...item,
      media_type: "movie",
    }));
  }
  return res;
};

export const appendMediaTypeTv = (res) => {
  if (res?.data?.results) {
    res.data.results = res.data.results.map((item) => ({
      ...item,
      media_type: "tv",
    }));
  }
  return res;
};

export const transformFilterMoiveAndTvFromResults = (res) => {
  if (res?.data?.results) {
    res.data.results = res.data.results.filter(
      ({ media_type }) => media_type === "tv" || media_type === "movie"
    );
    return res;
  }
};
