SQL Setup Queries -- 
CREATE DATABASE diet_planner;
USE diet_planner;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profile (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
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

CREATE TABLE food_items (
    food_id INT AUTO_INCREMENT PRIMARY KEY,
    food_name VARCHAR(100) NOT NULL,
    category ENUM('Breakfast','Lunch','Dinner','Snacks') NOT NULL,
    food_type ENUM('Vegetarian','Non-Vegetarian','Vegan') NOT NULL,
    protein DECIMAL(5,2),
    vitamins VARCHAR(100),
    calories INT
);
CREATE TABLE weekly_meal_plan (
    plan_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    day ENUM('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,

    breakfast_food_id INT,
    lunch_food_id INT,
    dinner_food_id INT,
    snacks_food_id INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_plan_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_breakfast
        FOREIGN KEY (breakfast_food_id)
        REFERENCES food_items(food_id),

    CONSTRAINT fk_lunch
        FOREIGN KEY (lunch_food_id)
        REFERENCES food_items(food_id),

    CONSTRAINT fk_dinner
        FOREIGN KEY (dinner_food_id)
        REFERENCES food_items(food_id),

    CONSTRAINT fk_snacks
        FOREIGN KEY (snacks_food_id)
        REFERENCES food_items(food_id)
);

INSERT INTO food_items 
(food_name, category, food_type, protein, vitamins, calories) 
VALUES
('Oats', 'Breakfast', 'Vegetarian', 13.0, 'B Vitamins', 150),
('Boiled Eggs', 'Breakfast', 'Non-Vegetarian', 12.0, 'Vitamin D', 155),
('Grilled Chicken', 'Lunch', 'Non-Vegetarian', 27.0, 'B12', 250),
('Dal & Rice', 'Lunch', 'Vegetarian', 18.0, 'Iron', 280),
('Vegetable Curry', 'Dinner', 'Vegetarian', 10.0, 'Vitamin A', 220),
('Fruit Salad', 'Snacks', 'Vegan', 3.0, 'Vitamin C', 120);

SHOW TABLES;

INSERT INTO users (full_name, email, password_hash)
VALUES ('Test User', 'test@example.com', 'Pass@123');

INSERT INTO user_profile (user_id, age, gender, diet_goal)
VALUES (1, 22, 'Male', 'Maintenance');

INSERT INTO weekly_meal_plan
(user_id, day, breakfast_food_id, lunch_food_id, dinner_food_id, snacks_food_id)
VALUES
(1, 'Monday', 1, 3, 5, 6);

SELECT 
    w.day,
    f1.food_name AS breakfast,
    f2.food_name AS lunch,
    f3.food_name AS dinner,
    f4.food_name AS snacks
FROM weekly_meal_plan w
LEFT JOIN food_items f1 ON w.breakfast_food_id = f1.food_id
LEFT JOIN food_items f2 ON w.lunch_food_id = f2.food_id
LEFT JOIN food_items f3 ON w.dinner_food_id = f3.food_id
LEFT JOIN food_items f4 ON w.snacks_food_id = f4.food_id
WHERE w.user_id = 1;


modify - 

ALTER TABLE user_profile
ADD COLUMN full_name VARCHAR(100) NOT NULL;

UPDATE user_profile p
JOIN users u ON p.user_id = u.user_id
SET p.full_name = u.full_name
WHERE p.user_id > 0;


ALTER TABLE weekly_meal_plan
CHANGE day day_name VARCHAR(20);

ALTER TABLE food_items
ADD COLUMN meal_type VARCHAR(20) NOT NULL;


UPDATE food_items SET meal_type = 'breakfast' WHERE food_id IN (1, 2);
UPDATE food_items SET meal_type = 'breakfast' WHERE food_id IN (1, 2);
UPDATE food_items SET meal_type = 'lunch' WHERE food_id IN (3, 4);
UPDATE food_items SET meal_type = 'snacks' WHERE food_id IN (6);

SELECT food_id, food_name, meal_type FROM food_items;



CREATE TABLE weekly_meal_plan (
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

    breakfast VARCHAR(150) DEFAULT NULL,
    lunch VARCHAR(150) DEFAULT NULL,
    dinner VARCHAR(150) DEFAULT NULL,
    snacks VARCHAR(150) DEFAULT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_weekly_meal_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);
