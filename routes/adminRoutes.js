const express =require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

const {adminDashboard, deleteVolunteer} = require("../controllers/adminController");

router.get(
    "/dashboard",
    authMiddleware,
    adminMiddleware,
    adminDashboard
);

router.get(
    "/delete/:id",
    authMiddleware,
    adminMiddleware,
    deleteVolunteer
);

module.exports = router;