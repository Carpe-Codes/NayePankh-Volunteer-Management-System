const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {getDashboard, getEditProfile, updateProfile} = require("../controllers/userController");

router.get("/dashboard", authMiddleware, getDashboard);

router.get("/edit-profile", authMiddleware, getEditProfile);

router.post("/update-profile", authMiddleware, updateProfile);

router.get("/logout", (req,res)=>{
        res.clearCookie("token");
        res.redirect("/login");
    }
);

module.exports = router;