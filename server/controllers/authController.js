const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.userAuthentication = async (req, res) => {
  //check errors: Missing parameters
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //get email and password from req
  const { email, password } = req.body;

  try {
    //Check user is registered
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ msg: "We couldn't find an account with that email address" });
    }

    //Check password
    const correctPassword = await bcryptjs.compare(password, user.password);
    if (!correctPassword) {
      return res.status(403).json({ msg: "Password is incorrect" });
    }

    //If user and password are correct
    //create and sign JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.TOKEN,
      {
        expiresIn: 3600, //seconds
      },
      (error, token) => {
        if (error) throw error;

        //confirm
        res.json({ token: token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//get authenticated user
exports.userAuthenticated = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Some error" });
  }
};
