"use strict";
const { isLoggedIn } = require("../../middlewares/isLoggedIn");

module.exports = async function (fastify, opts) {
  fastify.get(
    "/my-movie-list",
    {
      schema: {
        description: "Get my movie list",
      },
      preHandler: [isLoggedIn],
    },
    async function (request, reply) {
      try {
        const queryMovieListings = fastify.db.any(
          `SELECT * FROM movie_listings WHERE movie_list_id = (SELECT id from movie_lists WHERE user_id = $1)`,
          [request.user]
        );

        const queryMovieList = fastify.db.one(
          `SELECT * FROM movie_lists WHERE user_id = $1`,
          [request.user]
        );

        const [items, movie_list] = await Promise.all([
          queryMovieListings,
          queryMovieList,
        ]);

        reply.send({
          id: movie_list.id,
          created_at: movie_list.created_at,
          items: items,
          count: items.length,
        });
      } catch (error) {
        throw error;
      }
    }
  );

  fastify.post(
    "/movie-list-item",
    {
      schema: {
        description: "Add movie to my movie list",
        body: {
          type: "object",
          required: ["movieId", "movie"],
          properties: {
            movieId: { type: "integer" },
            movie: { type: "object" },
          },
        },
      },
      preHandler: [isLoggedIn],
    },
    async function (request, reply) {
      const { movieId, movie } = request.body;

      try {
        const movieList = await fastify.db.one(
          "SELECT id FROM movie_lists WHERE user_id = $1",
          [request.user]
        );
        console.log(movieList);
        const { id, created_at } = await fastify.db.one(
          "INSERT INTO movie_listings (movie_list_id, movie_id, movie) VALUES ($1, $2, $3) RETURNING id, created_at",
          [movieList.id, movieId, movie]
        );

        reply.code(200).send({
          item: {
            id: id,
            movieId,
            movie,
            created_at,
          },
        });
      } catch (error) {
        throw error;
      }
    }
  );
};
