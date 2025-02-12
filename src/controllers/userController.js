const db = require('../config/db');

const getUserDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('SELECT username FROM users WHERE id = ?', [id]);

        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(result[0]);  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllBookingDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('SELECT id AS train_id FROM bookings WHERE id = ?', [id]);

        if (result.length === 0) {
            return res.status(404).json({ error: "No bookings found for this user" });
        }

        res.json(result);  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUserDetails, getAllBookingDetails };
