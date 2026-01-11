const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const {
    saveMealPlan,
    getMealPlan
} = require("../controllers/mealPlanController");

router.post("/meal-plan", verifyToken, saveMealPlan);
router.get("/meal-plan", verifyToken, getMealPlan);

module.exports = router;
