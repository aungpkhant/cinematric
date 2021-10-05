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
          `SELECT * FROM media_listings WHERE media_list_id = (SELECT id from media_lists WHERE user_id = $1 AND list_type = 'default' AND media_type = 'movie')`,
          [request.user]
        );

        const queryMovieList = fastify.db.one(
          `SELECT * FROM media_lists WHERE user_id = $1 AND list_type = 'default' AND media_type = 'movie'`,
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

  fastify.get(
    "/my-tv-list",
    {
      schema: {
        description: "Get my tv show list",
      },
      preHandler: [isLoggedIn],
    },
    async function (request, reply) {
      try {
        const queryTvListings = fastify.db.any(
          `SELECT * FROM media_listings WHERE media_list_id = (SELECT id from media_lists WHERE user_id = $1 AND list_type = 'default' AND media_type = 'tv')`,
          [request.user]
        );

        const queryTvList = fastify.db.one(
          `SELECT * FROM media_lists WHERE user_id = $1 AND list_type = 'default' AND media_type = 'tv'`,
          [request.user]
        );

        const [items, tv_list] = await Promise.all([
          queryTvListings,
          queryTvList,
        ]);

        reply.send({
          id: tv_list.id,
          created_at: tv_list.created_at,
          items: items,
          count: items.length,
        });
      } catch (error) {
        throw error;
      }
    }
  );

  fastify.post(
    "/media-listing",
    {
      schema: {
        description: "Add an item to a media list",
        body: {
          type: "object",
          required: ["media_list_id", "media_id", "media_type", "item"],
          properties: {
            media_list_id: { type: "string" },
            media_id: { type: "integer" },
            media_type: { type: "string", enum: ["tv", "movie"] },
            item: { type: "object" },
          },
        },
      },
      preHandler: [isLoggedIn],
    },
    async function (request, reply) {
      const { media_list_id, media_id, media_type, item } = request.body;

      try {
        const { id, created_at } = await fastify.db.one(
          "INSERT INTO media_listings (media_list_id, media_id, media_type, item, status) SELECT $1, $2, $3, $4, $5 FROM media_lists WHERE id = $6 AND user_id = $7 RETURNING id, created_at",
          [
            media_list_id,
            media_id,
            media_type,
            item,
            "plan_to_watch",
            media_list_id,
            request.user,
          ]
        );

        reply.code(200).send({
          item: {
            id: id,
            created_at,
            media_list_id,
            media_id,
            status: "plan_to_watch",
            item,
          },
        });
      } catch (error) {
        throw error;
      }
    }
  );
};
