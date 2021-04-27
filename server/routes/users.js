//Create user route
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

//create user api/users
router.post('/',
    userController.createUser
);
module.exports = router;