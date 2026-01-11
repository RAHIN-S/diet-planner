exports.getFoods = (req, res) => {
    const sql = `
        SELECT food_id, food_name, meal_type
        FROM food_items
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};
