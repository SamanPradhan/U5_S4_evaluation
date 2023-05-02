const { IPModel } = require("../models/ip.model");

const { Router } = require("express");
const axios = require("axios");

const { redisCoz } = require("./redis/redis");

const { json } = require("node:stream/consumers");

const IPRouter = Router();

require("dotenv").config();

IPRouter.get("/:ip", async (req, res) => {
  const { ip } = req.params;
  try {
    redisCoz.get(ip, async (err, data) => {
      if (data) {
        const ipData = JSON.parse(data);
        console.log(ipData);
        res.status(200).send({ city: ipData.city });
        return;
      }
      const response = await axios.get(`https://ipapi.co/${ip}/json`);
      const ipData = response.data;
      console.log(ipData);
      redisCoz.set(ip, JSON.stringify(ipData), { EX: 60 * 60 * 6 });
      const newIP = new IPModel({ ip, city: ipData.city });
      await newIP.save();
      res.status(200).send({ city: ipData.city });
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { IPRouter };
