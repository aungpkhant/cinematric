"use strict";
const { isLoggedIn } = require("../../middlewares/isLoggedIn");

module.exports = async function (fastify, opts) {
  fastify.get(
    "/my-movie-list",
    {
      schema: {
        tags: ["lists"],
        description: "Get my movie list",
        querystring: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["plan_to_watch", "watching", "dropped", "completed"],
            },
          },
        },
      },
      preHandler: [isLoggedIn],
    },
    async function (request, reply) {
      let { status: statusQueryString = null } = request.query;

      try {
        const queryMovieListings = fastify.db.any(
          `SELECT * FROM media_listings WHERE media_list_id = (SELECT id from media_lists WHERE user_id = $1 AND list_type = 'default' AND media_type = 'movie') AND ($2 IS NULL OR status = $2) ORDER BY updated_at DESC;`,
          [request.user, statusQueryString]
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
        tags: ["lists"],
        description: "Get my tv show list",
        querystring: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["plan_to_watch", "watching", "dropped", "completed"],
            },
          },
        },
      },
      preHandler: [isLoggedIn],
    },
    async function (request, reply) {
      let { status: statusQueryString = null } = request.query;

      try {
        const queryTvListings = fastify.db.any(
          `SELECT * FROM media_listings WHERE media_list_id = (SELECT id from media_lists WHERE user_id = $1 AND list_type = 'default' AND media_type = 'tv')  AND ($2 IS NULL OR status = $2) ORDER BY updated_at DESC;`,
          [request.user, statusQueryString]
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
        tags: ["lists"],
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
      const currentTimestamp = new Date().toISOString();

      try {
        const { id, created_at } = await fastify.db.tx(async (t) => {
          const media_listing = await t.one(
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
          await t.any("UPDATE media_lists SET updated_at = $1 WHERE id = $2", [
            currentTimestamp,
            media_list_id,
          ]);
          return media_listing;
        });

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
        tags: ["lists"],
        description: "Edit media listing",
        params: {
          type: "object",
          required: ["id"],
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
        const currentTimestamp = new Date().toISOString();

        const { listing } = await fastify.db.tx(async (t) => {
          const listing = await t.one(
            "UPDATE media_listings SET status = $1, remark = $2, updated_at = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
            [status, remark, currentTimestamp, id, request.user]
          );
          await t.any("UPDATE media_lists SET updated_at = $1 WHERE id = $2;", [
            currentTimestamp,
            listing.media_list_id,
          ]);

          return { listing };
        });

        reply.send({
          item: listing,
        });
      } catch (error) {
        throw error;
      }
    }
  );

  fastify.delete(
    "/media-listing/:id",
    {
      preHandler: [isLoggedIn],
      schema: {
        tags: ["lists"],
        description: "Delete a media listing",
        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string" },
          },
        },
      },
    },
    async function (request, reply) {
      try {
        const { id } = request.params;
        const currentTimestamp = new Date().toISOString();

        await fastify.db.tx(async (t) => {
          await t.any(
            "UPDATE media_lists SET updated_at = $1 WHERE id = (SELECT media_list_id from media_listings WHERE id = $2)",
            [currentTimestamp, id]
          );
          await t.none(
            "DELETE FROM media_listings WHERE id = $1 AND user_id = $2",
            [id, request.user]
          );
        });

        reply.code(204).send();
      } catch (error) {
        throw error;
      }
    }
  );
};
