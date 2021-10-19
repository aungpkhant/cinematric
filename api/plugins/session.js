"use strict";
const cookie = require("fastify-cookie");
const session = require("fastify-session");
const fp = require("fastify-plugin");
const appConfig = require("../config/appConfig");
const pgSessionStore = require("connect-pg-simple");

/**
 * @param {import('fastify').FastifyInstance} fastify
 */
const plugin = async function (fastify, opts) {
  const SessionStore = pgSessionStore(session);

  fastify.register(cookie);
  fastify.register(session, {
    store: new SessionStore({
      tableName: "user_sessions",
      pool: fastify.db.$pool,
    }),
    secret: appConfig.sessionSecret,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      domain:
        process.env.NODE_ENV === "development" ? "localhost" : "cinematric.xyz",
    },
  });
};

module.exports = fp(plugin, { name: "session", dependencies: ["db"] });
