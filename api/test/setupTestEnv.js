module.exports = () => {
  process.env.SESSION_SECRET = "bcf714c5449e870193ea07819d4a3afe";
  process.env.POSTGRES_URI =
    "postgres://postgres:2144@localhost:5432/cinematric_test";
  process.env.NODE_ENV = "development";
};
