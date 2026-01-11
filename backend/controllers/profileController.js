const db = require("../config/db");

/* ---------------- GET USER PROFILE ---------------- */
exports.getProfile = (req, res) => {
    const userId = req.userId;

    const sql = `
        SELECT 
            full_name,
            age,
            gender,
            height,
            weight,
            diet_goal,
            dietary_preference,
            allergies
        FROM user_profile
        WHERE user_id = ?
    `;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.json({ message: "Profile not found" });
        }

        res.json(result[0]);
    });
};

/* ---------------- SAVE / UPDATE PROFILE ---------------- */
exports.saveProfile = (req, res) => {
    const userId = req.userId;

    // ✅ INCLUDE full_name
    const {
        full_name,
        age,
        gender,
        height,
        weight,
        diet_goal,
        dietary_preference,
        allergies
    } = req.body;

    const checkSql = `SELECT user_id FROM user_profile WHERE user_id = ?`;

    db.query(checkSql, [userId], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length > 0) {
            // ✅ UPDATE profile
            const updateSql = `
                UPDATE user_profile
                SET 
                    full_name = ?,
                    age = ?,
                    gender = ?,
                    height = ?,
                    weight = ?,
                    diet_goal = ?,
                    dietary_preference = ?,
                    allergies = ?
                WHERE user_id = ?
            `;

            db.query(
                updateSql,
                [
                    full_name,
                    age,
                    gender,
                    height,
                    weight,
                    diet_goal,
                    dietary_preference,
                    allergies,
                    userId
                ],
                (err) => {
                    if (err) return res.status(500).json(err);
                    res.json({ message: "Profile updated successfully" });
                }
            );

        } else {
            // ✅ INSERT profile
            const insertSql = `
                INSERT INTO user_profile 
                (user_id, full_name, age, gender, height, weight, diet_goal, dietary_preference, allergies)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            db.query(
                insertSql,
                [
                    userId,
                    full_name,
                    age,
                    gender,
                    height,
                    weight,
                    diet_goal,
                    dietary_preference,
                    allergies
                ],
                (err) => {
                    if (err) return res.status(500).json(err);
                    res.json({ message: "Profile saved successfully" });
                }
            );
        }
    });
};
