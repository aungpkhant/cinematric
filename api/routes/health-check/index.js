"use strict";

module.exports = async function (fastify, opts) {
  fastify.get(
    "/",
    {
      schema: {
        description: "Health check",
        tags: ["health-check"],
        response: {
          200: {
            type: "object",
            properties: {
              status: { enum: ["ok"] },
              timestamp: { type: "string" },
            },
          },
        },
      },
    },
    async function (request, reply) {
      return { status: "ok", timestamp: new Date().toISOString() };
    }
  );
};
