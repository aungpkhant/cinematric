"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-cors"), {
    origin:
      process.env.NODE_ENV === "development"
        ? ["http://localhost:3000"]
        : ["https://vercel.app"],
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
  });
});
