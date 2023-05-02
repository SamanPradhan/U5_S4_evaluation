const express = require("express");
const { connection } = require("./config/db");
const { authectication } = require("./middlewares/auth");
const { validator } = require("./middlewares/validator");
const { logger } = require("./middlewares/winston");
const { redisCoz } = require("./redis/redis");
const { userRouter } = require("./routes/user.route");
const { IPRouter } = require("./routes/ip.route");
const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.status(400).send("base route");
});

app.use("/user", userRouter);
app.use(authectication);
app.use(logger);
app.use("/ip", validator, IPRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log("can't connect to db");
  }

  console.log("server is runnig at", PORT);
});
