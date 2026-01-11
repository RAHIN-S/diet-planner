const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
        INSERT INTO users (full_name, email, password_hash)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, hashedPassword], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "User registered successfully" });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {
            if (err || result.length === 0) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const validPassword = await bcrypt.compare(
                password,
                result[0].password_hash
            );

            if (!validPassword) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { userId: result[0].user_id },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            res.json({ token });
        }
    );
};
