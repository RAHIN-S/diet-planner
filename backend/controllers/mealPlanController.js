const db = require("../config/db");

exports.saveMealPlan = (req, res) => {
    const userId = req.userId;
    const plan = req.body;

    if (!Array.isArray(plan)) {
        return res.status(400).json({ message: "Invalid plan data" });
    }

    // 1️⃣ Remove existing plan
    db.query(
        "DELETE FROM weekly_meal_plan WHERE user_id = ?",
        [userId],
        (err) => {
            if (err) {
                console.error("DELETE ERROR:", err);
                return res.status(500).json({ message: "Failed to reset plan" });
            }

            // 2️⃣ Prepare bulk insert values
            const values = plan.map(day => [
                userId,
                day.day,
                day.breakfast_food_id || null,
                day.lunch_food_id || null,
                day.dinner_food_id || null,
                day.snacks_food_id || null
            ]);

            // 3️⃣ Insert all rows in ONE query
            const insertSql = `
                INSERT INTO weekly_meal_plan
                (user_id, day_name, breakfast, lunch, dinner, snacks)
                VALUES ?
            `;

            db.query(insertSql, [values], (err) => {
                if (err) {
                    console.error("INSERT ERROR:", err);
                    return res.status(500).json({ message: "Failed to save meal plan" });
                }

                res.json({ message: "Weekly meal plan saved successfully" });
            });
        }
    );
};

exports.getMealPlan = (req, res) => {
    const userId = req.userId;

    const sql = `
        SELECT 
            day_name,
            breakfast,
            lunch,
            dinner,
            snacks
        FROM weekly_meal_plan
        WHERE user_id = ?
        ORDER BY FIELD(
            day_name,
            'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'
        )
    `;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("FETCH ERROR:", err);
            return res.status(500).json({ message: "Failed to load plan" });
        }
        res.json(result);
    });
};
