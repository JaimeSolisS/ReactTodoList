const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  //get email and password
  const { email, password } = req.body;

  try {
    //Check if user is unique
    let user = await User.findOne({ email });

    if (user) {
      return res.status(403).json({ msg: "User already exists" });
    }

    //check errors: Missing parameters, weak password
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //crete new user
    user = new User(req.body);

    //Hash password
    const salt = await bcryptjs.genSalt(10);

    user.password = await bcryptjs.hash(password, salt);

    //save user
    await user.save();

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
        res.json({ token: token, msg: "User created!" });
      }
    );

    //Confirm
    //res.status(200).json({ msg: "User created!" });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something happened");
  }
};
