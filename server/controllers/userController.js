const User = require("../models/User");
exports.createUser = async (req, res) => {
  // console.log(req.body);

  try {
    let user;

    //crete new user
    user = new User(req.body);

    //save user
    await user.save();

    //Confirm
    res.send("User created!");
  } catch (error) {
    console.log(error);
    res.status(400).send("Something happened");
  }
};
