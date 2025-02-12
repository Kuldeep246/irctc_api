const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db  = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET;


const userRegister = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [existingUsers] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (existingUsers.length > 0) {
            return res.status(409).json({ error: "username already in use" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );
        res.json({ message: 'User registered', user: { id: result.insertId, username } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const userLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in the environment variables");
            return res.status(500).json({ error: 'Internal server error' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user.id, username: user.username } });

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const adminRegister = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [existingUsers] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);

        if (existingUsers.length > 0) {
            return res.status(409).json({ error: "username already in use" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            'INSERT INTO admins (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );
        res.json({ message: 'Admin registered', admin: { id: result.insertId, username } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
        const admin = rows[0];
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin.id, isAdmin: true, username: admin.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { userLogin, userRegister, adminLogin, adminRegister };
