// * Should generate this during build time to account for api changes

export const TMDB_IMG_BASE_URL = "https://image.tmdb.org/t/p";

export const TMDB_BACKDROP_SIZES = {
  w300: "w300",
  w780: "w780",
  w1280: "w1280",
  original: "original",
};

export const TMDB_POSTER_SIZES = {
  w92: "w92",
  w154: "w154",
  w185: "w185",
  w342: "w342",
  w500: "w500",
  w780: "w780",
  original: "original",
};

export const TMDB_PROFILE_SIZES = {
  w45: "w45",
  w185: "w185",
  h632: "h632",
  original: "original",
};

export const MOVIE_GENRES = {
  12: {
    id: 12,
    slug: "adventure",
    value: "Adventure",
  },
  14: {
    id: 14,
    slug: "fantasy",
    value: "Fantasy",
  },
  16: {
    id: 16,
    slug: "animation",
    value: "Animation",
  },
  18: {
    id: 18,
    slug: "drama",
    value: "Drama",
  },
  27: {
    id: 27,
    slug: "horror",
    value: "Horror",
  },
  28: {
    id: 28,
    slug: "action",
    value: "Action",
  },
  35: {
    id: 35,
    slug: "comedy",
    value: "Comedy",
  },
  36: {
    id: 36,
    slug: "history",
    value: "History",
  },
  37: {
    id: 37,

    slug: "western",
    value: "Western",
  },
  53: {
    id: 53,

    slug: "thriller",
    value: "Thriller",
  },
  80: {
    id: 80,
    slug: "crime",
    value: "Crime",
  },
  99: {
    id: 99,
    slug: "documentary",
    value: "Documentary",
  },
  878: {
    id: 878,
    slug: "science-fiction",
    value: "Science Fiction",
  },
  9648: {
    id: 9648,
    slug: "mystery",
    value: "Mystery",
  },
  10402: {
    id: 10402,
    slug: "music",
    value: "Music",
  },
  10749: {
    id: 10749,
    slug: "romance",
    value: "Romance",
  },
  10751: {
    id: 10751,
    slug: "family",
    value: "Family",
  },
  10752: {
    id: 10752,
    slug: "war",
    value: "War",
  },
  10770: {
    id: 10770,
    slug: "tv-movie",
    value: "TV Movie",
  },
};

export const TV_GENRES = {
  16: {
    id: 16,
    slug: "animation",
    value: "Animation",
  },
  18: {
    id: 18,
    slug: "drama",
    value: "Drama",
  },
  35: {
    id: 35,
    slug: "comedy",
    value: "Comedy",
  },
  37: {
    id: 37,
    slug: "western",
    value: "Western",
  },
  80: {
    id: 80,
    slug: "crime",
    value: "Crime",
  },
  99: {
    id: 99,
    slug: "documentary",
    value: "Documentary",
  },
  9648: {
    id: 9648,
    slug: "mystery",
    value: "Mystery",
  },
  10751: {
    id: 10751,
    slug: "family",
    value: "Family",
  },
  10759: {
    id: 10759,
    slug: "action-and-adventure",
    value: "Action & Adventure",
  },
  10762: {
    id: 10762,
    slug: "kids",
    value: "Kids",
  },
  10763: {
    id: 10763,
    slug: "news",
    value: "News",
  },
  10764: {
    id: 10764,
    slug: "reality",
    value: "Reality",
  },
  10765: {
    id: 10765,
    slug: "scifi-and-fantasy",
    value: "Sci-Fi & Fantasy",
  },
  10766: {
    id: 10766,
    slug: "soap",
    value: "Soap",
  },
  10767: {
    id: 10767,
    slug: "talk",
    value: "Talk",
  },
  10768: {
    id: 10768,
    slug: "war-and-politics",
    value: "War & Politics",
  },
};

const BASE_BROWSE_URL = "/browse/m";
const BASE_BROWSE_GENRE_URL = "/browse/m/genre";

export const CATEGORIES = [
  {
    slug: "popular",
    value: "Popular",
    path: `${BASE_BROWSE_URL}/popular`,
  },
  ...Object.values(MOVIE_GENRES).map((genre) => ({
    ...genre,
    path: `${BASE_BROWSE_GENRE_URL}/${genre.slug}`,
  })),
];
