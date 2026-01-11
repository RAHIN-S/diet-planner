const router = require("express").Router();
const { getFoods } = require("../controllers/foodController");

router.get("/foods", getFoods);
module.exports = router;
