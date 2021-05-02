//Routes for user authentication
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

//log in user
//api/auth
router.post(
  "/",
  [
    check("email", "Enter your email").not().isEmpty(),
    check("password", "Enter your password").not().isEmpty(),
  ],
  authController.userAuthentication
);
//auth user
router.get("/", auth, authController.userAuthenticated);
module.exports = router;
