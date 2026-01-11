const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const profileController = require("../controllers/profileController");

// Protected routes
router.get("/", verifyToken, profileController.getProfile);
router.post("/", verifyToken, profileController.saveProfile);

module.exports = router;
