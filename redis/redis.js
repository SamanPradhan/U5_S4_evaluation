const redis = require("redis");

const redisCoz = redis.createClient();

redisCoz.on("connect", async () => {
  console.log("redis is connected");

  //data
});

redisCoz.on("error", (error) => {
  console.log(error.message);
});

redisCoz.connect();

module.exports = { redisCoz };
