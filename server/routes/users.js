//Create user route
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const { check } = require('express-validator');


//create user api/users
router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Use a valid email').isEmail(),
        check('password', 'Please enter a password at least 8 characters long and contain at least one uppercase, one lower case and at least one special character').isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/, )
    ],
    userController.createUser
);
module.exports = router;