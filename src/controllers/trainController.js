const db  = require('../config/db');

const getTrains = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM trains');
        res.json(result);  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTrainSeats = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('SELECT available_seats FROM trains WHERE id = ?', [id]);

        if (result.length === 0) {
            return res.status(404).json({ error: "Train not found" });
        }

        res.json(result[0]); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports={getTrainSeats,getTrains};
