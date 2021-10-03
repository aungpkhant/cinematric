const setupTestEnvironment = require("../../setupTestEnvironment");

const fastify = setupTestEnvironment();

test("should signup a user with default movie and tv list", async () => {
  const user = { username: "test", email: "test@test.com", password: "test" };

  const signup = await fastify.inject({
    url: "/api/users/signup",
    method: "POST",
    payload: user,
  });

  expect(signup.statusCode).toBe(201);
  expect(signup.json().username).toBe(user.username);

  const cookie = signup.headers["set-cookie"];

  const myMovieList = await fastify.inject({
    url: "/api/lists/my-movie-list",
    method: "GET",
    headers: { cookie },
  });

  expect(myMovieList.statusCode).toBe(200);
  expect(myMovieList.json().items).toEqual([]);

  const myTvList = await fastify.inject({
    url: "/api/lists/my-tv-list",
    method: "GET",
    headers: { cookie },
  });

  expect(myTvList.statusCode).toBe(200);
  expect(myTvList.json().items).toEqual([]);
});

test("should reject signup when username is taken", async () => {
  const firstUser = {
    username: "test",
    email: "test@test.com",
    password: "test",
  };
  const userWithTakenUsername = {
    username: "test",
    email: "test2@test.com",
    password: "test",
  };

  // Signup first user
  const signup = await fastify.inject({
    url: "/api/users/signup",
    method: "POST",
    payload: firstUser,
  });
  expect(signup.statusCode).toBe(201);
  expect(signup.json().username).toBe(firstUser.username);

  // Signup user with conflicting username
  const signupSecondUser = await fastify.inject({
    url: "/api/users/signup",
    method: "POST",
    payload: userWithTakenUsername,
  });
  expect(signupSecondUser.statusCode).toBe(422);
});

test("should reject signup when email is taken", async () => {
  const firstUser = {
    username: "testuser1",
    email: "test@test.com",
    password: "test",
  };
  const userWithTakenEmail = {
    username: "testuser2",
    email: "test@test.com",
    password: "test",
  };

  // Signup first user
  const signup = await fastify.inject({
    url: "/api/users/signup",
    method: "POST",
    payload: firstUser,
  });
  expect(signup.statusCode).toBe(201);
  expect(signup.json().username).toBe(firstUser.username);

  // Signup user with conflicting username
  const signupSecondUser = await fastify.inject({
    url: "/api/users/signup",
    method: "POST",
    payload: userWithTakenEmail,
  });
  expect(signupSecondUser.statusCode).toBe(422);
});

test("should login a user and access user profile", async () => {
  const user = { username: "test", email: "test@test.com", password: "test" };

  const signup = await fastify.inject({
    url: "/api/users/signup",
    method: "POST",
    payload: user,
  });

  const login = await fastify.inject({
    url: "/api/users/login",
    method: "POST",
    payload: user,
  });

  expect(login.statusCode).toBe(200);
  const cookie = login.headers["set-cookie"];

  const profile = await fastify.inject({
    url: "/api/users/me",
    method: "GET",
    headers: { cookie },
  });

  expect(profile.statusCode).toBe(200);
  expect(profile.json().id).toBe(signup.json().id);
  expect(profile.json().username).toBe(user.username);
  expect(profile.json().email).toBe(user.email);
});
