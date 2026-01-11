const db = require("../config/db");

exports.getFoods = (req, res) => {
    const sql = `
        SELECT food_id, food_name, meal_type
        FROM food_items
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to load foods" });
        }
        res.json(result);
    });
};
