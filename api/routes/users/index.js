"use strict";

const bcrypt = require("bcryptjs");
const { isLoggedIn } = require("../../middlewares/isLoggedIn");

/**
 * @param {import('fastify').FastifyInstance} fastify
 */
module.exports = async function (fastify, opts) {
  fastify.post(
    "/signup",
    {
      schema: {
        tags: ["users"],
        body: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            username: {
              type: "string",
            },
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
        },
      },
    },
    async function (request, reply) {
      const { username, email, password } = request.body;

      try {
        const userCountWithUsername = await fastify.db.oneOrNone(
          "SELECT COUNT(1) FROM users WHERE username = $1",
          [username]
        );

        const userCountWithEmail = await fastify.db.oneOrNone(
          "SELECT COUNT(1) FROM users WHERE email = $1",
          [email]
        );

        let alreadyTakenFieldsErrorMessage = "";

        // * The query returns a string interestingly
        // TODO line breaks?
        if (parseInt(userCountWithUsername.count) > 0) {
          alreadyTakenFieldsErrorMessage += "Username is already taken\r\n";
        }
        if (parseInt(userCountWithEmail.count) > 0) {
          alreadyTakenFieldsErrorMessage += "Email is already taken\r\n";
        }

        if (alreadyTakenFieldsErrorMessage !== "") {
          return reply.unprocessableEntity(alreadyTakenFieldsErrorMessage);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const { user, _ } = await fastify.db.tx(async (t) => {
          const user = await t.one(
            "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id",
            [username, email, passwordHash]
          );
          await t.one(
            `INSERT INTO media_lists (user_id, list_type, media_type) VALUES ($1, 'default', 'movie') RETURNING id`,
            [user.id]
          );
          await t.one(
            `INSERT INTO media_lists (user_id, list_type, media_type) VALUES ($1, 'default', 'tv') RETURNING id`,
            [user.id]
          );

          return { user };
        });

        request.session.user = { userId: user.id, isLoggedIn: true };

        reply.code(201).send({
          id: user.id,
          username,
          email,
        });
      } catch (error) {
        console.warn(error);
        throw new Error("Unable to complete signup");
      }
    }
  );

  fastify.post(
    "/login",
    {
      schema: {
        tags: ["users"],
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
        },
      },
    },
    async function (request, reply) {
      const { email, password } = request.body;

      try {
        const user = await fastify.db.one(
          "SELECT id, username, email, password_hash FROM users WHERE email = $1",
          [email]
        );

        const isValidPassword = await bcrypt.compare(
          password,
          user.password_hash
        );

        if (!isValidPassword) {
          throw new Error("Invalid Credentials");
        }

        request.session.user = { userId: user.id, isLoggedIn: true };

        reply
          .code(200)
          .send({ id: user.id, username: user.username, success: true });
      } catch (error) {
        throw new Error("Invalid Credentials");
      }
    }
  );

  fastify.get(
    "/me",
    {
      schema: {
        tags: ["users"],
        response: {
          properties: {
            id: { type: "string" },
            email: { type: "string", format: "email" },
            username: { type: "string" },
          },
        },
      },
      preHandler: [isLoggedIn],
    },
    async function (request, reply) {
      try {
        const user = await fastify.db
          .oneOrNone("SELECT id, username, email FROM users WHERE id = $1", [
            request.user,
          ])
          .catch((error) => {
            console.log(error);
          });

        return user;
      } catch (error) {
        console.warn(error);
        throw new Error("Server Error");
      }
    }
  );
};
