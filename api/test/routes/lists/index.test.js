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
    release_date: "2021-07-22",
    revenue: 36964325,
    runtime: 121,
    status: "Released",
    tagline: "Every warrior has a beginning.",
    title: "Snake Eyes: G.I. Joe Origins",
    video: false,
    vote_average: 7,
    vote_count: 493,
  },
});

describe("Media List endpoints", () => {
  let cookie = null;
  let userDefaultMovieListId = null;

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

    const userDefaultMovieList = await fastify.inject({
      url: "/api/lists/my-movie-list",
      method: "GET",
      headers: { cookie },
    });

    expect(userDefaultMovieList.statusCode).toBe(200);
    expect(userDefaultMovieList.json().id).toBeTruthy();

    userDefaultMovieListId = userDefaultMovieList.json().id;
  });

  it("should add a movie listing to user's default movie list", async () => {
    let payload = generateMediaListingPayload(userDefaultMovieListId);

    const addItemToMovieList = await fastify.inject({
      url: "/api/lists/media-listing",
      method: "POST",
      headers: { cookie },
      payload: payload,
    });

    expect(addItemToMovieList.statusCode).toBe(200);
    expect(addItemToMovieList.json().item.media_id).toBe(payload.media_id);

    const userDefaultMovieListAfterDataAdded = await fastify.inject({
      url: "/api/lists/my-movie-list",
      method: "GET",
      headers: { cookie },
    });

    expect(userDefaultMovieListAfterDataAdded.statusCode).toBe(200);
    expect(userDefaultMovieListAfterDataAdded.json().count).toBe(1);
  });

  it("should fail when adding to other user's list", async () => {
    const secondUser = {
      username: "ashura2",
      email: "ashura2@test.com",
      password: "test",
    };

    const signUpSecondUser = await fastify.inject({
      url: "/api/users/signup",
      method: "POST",
      payload: secondUser,
    });

    expect(signUpSecondUser.statusCode).toBe(201);

    // Authorized as second user
    secondUserCookie = signUpSecondUser.headers["set-cookie"];

    const addItemToFirstUserList = await fastify.inject({
      url: "/api/lists/media-listing",
      method: "POST",
      headers: { cookie: secondUserCookie },
      payload: generateMediaListingPayload(userDefaultMovieListId),
    });

    expect(addItemToFirstUserList.statusCode).toBe(500);
  });

  it("should fail when adding duplicate items to list", async () => {
    const addItemToMovieList = await fastify.inject({
      url: "/api/lists/media-listing",
      method: "POST",
      headers: { cookie },
      payload: generateMediaListingPayload(userDefaultMovieListId),
    });

    expect(addItemToMovieList.statusCode).toBe(200);

    const addDuplicateItemToMovieList = await fastify.inject({
      url: "/api/lists/media-listing",
      method: "POST",
      headers: { cookie },
      payload: generateMediaListingPayload(userDefaultMovieListId),
    });

    expect(addDuplicateItemToMovieList.statusCode).toBe(500);
  });

  it.todo("should edit a media listing");
});
