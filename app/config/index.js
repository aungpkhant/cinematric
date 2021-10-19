const config = {
  development: {
    site: {
      domain: "localhost",
      URL: "http://localhost:3000", // dont give "/" at the end
    },
    api: {
      ENDPOINT: "http://localhost:8080/api/",
    },
  },
  production: {
    site: {
      domain: "cinematric.xyz",
      URL: "https://cinematric.xyz", // dont give "/" at the end
    },
    api: {
      ENDPOINT: "http://api.cinematric.xyz/api/",
    },
  },
};

export default config[process.env.NODE_ENV];
