const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, pass, mob } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      const user = new UserModel({ name, email, pass: hash, mob });
      await user.save();
      res.send("Registered successfully");
    });
  } catch (err) {
    res.send("Error in registering the user");
    console.log(err);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, function (err, result) {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "note");
          res.send({ msg: "Login Successfull", token: token });
        } else {
          res.send("Wrong Credntials");
        }
      });
    } else {
      res.send("Wrong Credntials");
    }
  } catch (err) {
    res.send("Something went wrong");
    console.log(err);
  }
});

module.exports={
  userRouter
}