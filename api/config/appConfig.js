function loadEnvironmentVariable(keyname) {
  const envVar = process.env[keyname];

  if (!envVar) {
    throw new Error(`Missing environment variable - ${keyname}`);
  }

  return envVar;
}

function loadArrayEnvironmentVariable(keyname) {
  return loadEnvironmentVariable(keyname).split(",");
}

module.exports = {
  postgresUri: loadEnvironmentVariable("POSTGRES_URI"),
  sessionSecret: loadArrayEnvironmentVariable("SESSION_SECRET"),
};
