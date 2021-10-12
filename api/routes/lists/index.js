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
          name: movie_list.name,
          created_at: movie_list.created_at,
          updated_at: movie_list.updated_at,
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
          name: tv_list.name,
          created_at: tv_list.created_at,
          updated_at: tv_list.updated_at,
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
          required: ["media_list_id", "media_id", "media_type"],
          properties: {
            media_list_id: { type: "string" },
            media_id: { type: "integer" },
            media_type: { type: "string", enum: ["tv", "movie"] },
          },
        },
      },
      preHandler: [isLoggedIn],
    },
    async function (request, reply) {
      const { media_list_id, media_id, media_type, item } = request.body;

      try {
        const {
          id,
          created_at,
        } = await fastify.db.one(
          "INSERT INTO media_listings (media_list_id, media_id, media_type, status, user_id) SELECT $1, $2, $3, $4, $6 FROM media_lists WHERE id = $5 AND user_id = $6 RETURNING id, created_at",
          [
            media_list_id,
            media_id,
            media_type,
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

  fastify.put(
    "/media-listing/:id",
    {
      preHandler: [isLoggedIn],
      schema: {
        description: "Edit media listing",
        params: {
          properties: {
            id: { type: "string" },
          },
        },
        body: {
          type: "object",
          required: ["status", "remark"],
          properties: {
            status: {
              type: "string",
              enum: ["watching", "plan_to_watch", "completed", "dropped"],
            },
            remark: {
              type: "string",
            },
          },
        },
      },
    },
    async function (request, reply) {
      try {
        const { id } = request.params;
        const { status, remark } = request.body;
        fastify.log.info(id);
        fastify.log.info(status);
        fastify.log.info(remark);
        fastify.log.info(request.user);

        const media_listing = await fastify.db.one(
          "UPDATE media_listings SET status = $1, remark = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
          [status, remark, id, request.user]
        );

        reply.send({
          item: media_listing,
        });
      } catch (error) {
        throw error;
      }
    }
  );
};
