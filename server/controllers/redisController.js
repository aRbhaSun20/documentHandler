const redis = require("redis");
const client = redis.createClient();

(async () => {
  client.on("error", (err) => console.error(err));
  return client.connect();
})();

module.export = client;
