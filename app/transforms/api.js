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

// export const appendTypeTV = (res) => {
//   if (res?.data?.results) {
//     res.data.results = res.data.results.map((item) => ({
//       ...item,
//       type: "movie",
//     }));
//   }
//   return res;
// };
