require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const mealPlanRoutes = require("./routes/mealPlanRoutes");
const foodRoutes = require("./routes/foodRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/meal-plan", mealPlanRoutes);
app.use("/api", foodRoutes);

// app.use("/api", foodRoutes);
app.use("/api", mealPlanRoutes);




// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
