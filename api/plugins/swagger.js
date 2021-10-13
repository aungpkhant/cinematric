const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-swagger"), {
    routePrefix: "/docs",
    swagger: {
      info: {
        title: "Cinematric API Docs",
        version: "0.1.0",
      },
      host: "localhost:8080",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [
        { name: "health-check", description: "Sanity check endpoint" },
        {
          name: "users",
          description: "User related endpoints",
        },
        {
          name: "lists",
          description: "Watchlist endpoints",
        },
      ],
      definitions: {},
    },
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
  });
});
