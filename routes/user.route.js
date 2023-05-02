const { userModel } = require("../models/user.model");

const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { redisCoz } = require("./redis/redis");
const userRouter = Router();
require("dotenv").config();

//register
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(200).send({ msg: "registered " });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserPresent = await userModel.findOne({ email });

    if (!isUserPresent) {
      return res.status.send({ msg: "User not present" });
    }

    const isPasswordRight = await bcrypt.compare(
      password,
      isUserPresent.password
    );

    if (!isPasswordRight) {
      return res.status.send({ msg: "password invalid" });
    }

    const token = await jwt.sign(
      { userID: isUserPresent._id, data: "IP" },
      process.env.JWT_secret,
      { expiresIn: 1000 }
    );

    res.status(200).send({ msg: "login successful ", token: token });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//logout
userRouter.get("/logout", async (req, res) => {
  try {
    const logoutToken = req.headers.authorization;

    if (!logoutToken) {
      res.status(400).send({ msg: "invalid token" });
      return;
    }
    redisCoz.set(token, token);
    res.status(200).send({ msg: "logout successful " });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { userRouter };
