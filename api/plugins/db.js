const fp = require("fastify-plugin");
const pgp = require("pg-promise")();
const DbMigrate = require("db-migrate");

const appConfig = require("../config/appConfig");

// * Will run migrations manually for now
// function runMigrations() {
//   return new Promise((resolve, reject) => {
//     const dbMigrate = DbMigrate.getInstance(true);

//     dbMigrate.up((error, results = []) => {
//       if (error) {
//         return reject(error);
//       }

//       resolve(results);
//     });
//   });
// }

/**
 * @param {import('fastify').FastifyInstance}
 */
module.exports = fp(
  async function (fastify) {
    const db = pgp(appConfig.postgresUri);

    fastify.decorate("db", db).addHook("onClose", async (instance, done) => {
      await db.$pool.end();
      done();
    });

    // const migrationResults = await runMigrations();

    // if (migrationResults.length > 0) {
    //   fastify.log.info({
    //     migrationsCount: migrationResutls.length,
    //     msg: "Successfully ran migrations",
    //   });
    // }
  },
  {
    name: "db",
  }
);
