const express = require("express");

const router = express.Router();

const { registerUser, loginUser} = require("../controllers/authController");

const {body} = require("express-validator");

router.post( "/register",
    body("name").trim().isLength({ min:3 }),
    body("email").trim().isEmail().isLength({ min:10 }),
    body("password").trim().isLength({ min:5 }),
    body("phone").trim().isLength({ min: 10, max: 10 })

    ,registerUser
);

router.post( "/login",
    body("email").trim().isEmail().isLength({ min:10 }),
    body("password").trim().isLength({ min:5 })
    
    ,loginUser
);

module.exports = router;