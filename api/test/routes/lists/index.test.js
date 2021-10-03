const setupTestEnvironment = require("../../setupTestEnvironment");

const fastify = setupTestEnvironment();

const generateMediaListingPayload = (media_list_id) => ({
  media_list_id,
  media_id: 135448,
  media_type: "movie",
  item: {
    adult: false,
    backdrop_path: "/aO9Nnv9GdwiPdkNO79TISlQ5bbG.jpg",
    belongs_to_collection: {
      id: 135448,
      name: "G.I. Joe (Live-Action) Collection",
      poster_path: "/8ykKDU3FisEFtCpPZloB1jqcAIn.jpg",
      backdrop_path: "/st6ukSdJrKfwYVwxGRHWqXJGrQc.jpg",
    },
    budget: 88000000,
    genres: [
      {
        id: 28,
        name: "Action",
      },
      {
        id: 12,
        name: "Adventure",
      },
    ],
    homepage: "https://www.snakeeyesmovie.com",
    id: 568620,
    imdb_id: "tt8404256",
    original_language: "en",
    original_title: "Snake Eyes: G.I. Joe Origins",
    overview:
      "After saving the life of their heir apparent, tenacious loner Snake Eyes is welcomed into an ancient Japanese clan called the Arashikage where he is taught the ways of the ninja warrior. But, when secrets from his past are revealed, Snake Eyes' honor and allegiance will be tested – even if that means losing the trust of those closest to him.",
    popularity: 2113.234,
    poster_path: "/uIXF0sQGXOxQhbaEaKOi2VYlIL0.jpg",
    production_companies: [
      {
        id: 4,
        logo_path: "/fycMZt242LVjagMByZOLUGbCvv3.png",
        name: "Paramount",
        origin_country: "US",
      },
      {
        id: 21,
        logo_path: "/aOWKh4gkNrfFZ3Ep7n0ckPhoGb5.png",
        name: "Metro-Goldwyn-Mayer",
        origin_country: "US",
      },
      {
        id: 435,
        logo_path: "/AjzK0s2w1GtLfR4hqCjVSYi0Sr8.png",
        name: "Di Bonaventura Pictures",
        origin_country: "US",
      },
      {
        id: 8147,
        logo_path: "/q6HOAdSNgCbeOqwoMVRc6REgbXF.png",
        name: "Entertainment One",
        origin_country: "CA",
      },
      {
        id: 82819,
        logo_path: "/5Z8WWr0Lf1tInVWwJsxPP0uMz9a.png",
        name: "Skydance Media",
        origin_country: "US",
      },
      {
        id: 2598,
        logo_path: "/i42C5gRq7XqlG4S9vkchuJZfrBn.png",
        name: "Hasbro",
        origin_country: "",
      },
    ],
    production_countries: [
      {
        iso_3166_1: "CA",
        name: "Canada",
      },
      {
        iso_3166_1: "JP",
        name: "Japan",
      },
      {
        iso_3166_1: "US",
        name: "United States of America",
      },
    ],
    release_date: "2021-07-22",
    revenue: 36964325,
    runtime: 121,
    spoken_languages: [
      {
        english_name: "English",
        iso_639_1: "en",
        name: "English",
      },
      {
        english_name: "Japanese",
        iso_639_1: "ja",
        name: "日本語",
      },
      {
        english_name: "Italian",
        iso_639_1: "it",
        name: "Italiano",
      },
    ],
    status: "Released",
    tagline: "Every warrior has a beginning.",
    title: "Snake Eyes: G.I. Joe Origins",
    video: false,
    vote_average: 7,
    vote_count: 493,
  },
});

describe("Media listing", () => {
  let cookie = null;

  beforeEach(async () => {
    const user = {
      username: "ashura",
      email: "ashura@test.com",
      password: "test",
    };

    const signup = await fastify.inject({
      url: "/api/users/signup",
      method: "POST",
      payload: user,
    });

    expect(signup.statusCode).toBe(201);
    cookie = signup.headers["set-cookie"];
  });

  test("should be added to user's default movie list", async () => {
    const userDefaultMovieList = await fastify.inject({
      url: "/api/lists/my-movie-list",
      method: "GET",
      headers: { cookie },
    });

    expect(userDefaultMovieList.statusCode).toBe(200);
    expect(userDefaultMovieList.json().id).toBeTruthy();

    const userDefaultMovieListId = userDefaultMovieList.json().id;

    const addItemToMovieList = await fastify.inject({
      url: "/api/lists/media-listing",
      method: "POST",
      headers: { cookie },
      payload: generateMediaListingPayload(userDefaultMovieListId),
    });

    expect(addItemToMovieList.statusCode).toBe(200);

    const userDefaultMovieListAfterDataAdded = await fastify.inject({
      url: "/api/lists/my-movie-list",
      method: "GET",
      headers: { cookie },
    });

    expect(userDefaultMovieListAfterDataAdded.statusCode).toBe(200);
    expect(userDefaultMovieListAfterDataAdded.json().count).toBe(1);
  });

  test.todo("should fail when adding to other user's list");

  test.todo("should fail when adding duplicate items to list");
});
