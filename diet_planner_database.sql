/* ================================
   1. Create Database
================================ */
CREATE DATABASE IF NOT EXISTS diet_planner_app;
USE diet_planner_app;

/* ================================
   2. Users Table
================================ */
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* ================================
   3. User Profile Table
================================ */
CREATE TABLE IF NOT EXISTS user_profile (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    age INT,
    gender ENUM('Male','Female','Other'),
    height DECIMAL(5,2),
    weight DECIMAL(5,2),
    diet_goal ENUM('Weight Loss','Weight Gain','Maintenance'),
    dietary_preference ENUM('Vegetarian','Non-Vegetarian','Vegan'),
    allergies VARCHAR(255),

    CONSTRAINT fk_user_profile
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

/* ================================
   4. Food Items Table
================================ */
CREATE TABLE IF NOT EXISTS food_items (
    food_id INT AUTO_INCREMENT PRIMARY KEY,
    food_name VARCHAR(100) NOT NULL,
    category ENUM('Breakfast','Lunch','Dinner','Snacks') NOT NULL,
    food_type ENUM('Vegetarian','Non-Vegetarian','Vegan') NOT NULL,
    meal_type VARCHAR(20) NOT NULL,
    protein DECIMAL(5,2),
    vitamins VARCHAR(100),
    calories INT
);

/* ================================
   5. Weekly Meal Plan Table
   (Final version – text-based meals)
================================ */
CREATE TABLE IF NOT EXISTS weekly_meal_plan (
    plan_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,

    day_name ENUM(
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ) NOT NULL,

    breakfast VARCHAR(150),
    lunch VARCHAR(150),
    dinner VARCHAR(150),
    snacks VARCHAR(150),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_weekly_meal_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);
