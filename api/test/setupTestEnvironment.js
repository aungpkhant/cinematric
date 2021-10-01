const fastify = require("fastify");
const fp = require("fastify-plugin");
const app = require("../app");
const setupEnv = require("./setupTestEnv");

const clearDatabaseSql = `DELETE FROM users;`;

/**
 * @returns {import('fastify').FastifyInstance}
 */
module.exports = function setupTestEnvironment() {
  // Setup environment variables for testing
  setupEnv();

  // Setup fastify server
  const server = fastify({
    logger: true,
    pluginTimeout: 2 * 60 * 1000,
  });

  // setup test lifecycle hooks
  beforeAll(async () => {
    server.register(fp(app));
    await server.ready();
    await server.db.query(clearDatabaseSql);
  });

  beforeEach(async () => {
    await server.db.query(clearDatabaseSql);
  });

  afterEach(async () => {
    await server.db.query(clearDatabaseSql);
  });

  afterAll(async () => {
    await server.close();
  });

  return server;
};
