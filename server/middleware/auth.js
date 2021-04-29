const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //read token from header
  const token = req.header("x-auth-token");

  //console.log(token); works

  //check if no token
  if (!token) {
    return res.status(401).json({ msg: "Token not found, permission denied" });
  }

  try {
    //validate token
    const cipher = jwt.verify(token, process.env.TOKEN);
    req.user = cipher.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
