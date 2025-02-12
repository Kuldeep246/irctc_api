const db = require('../config/db');

const bookSeat = async (req, res) => {
    try {
        const { trainId } = req.params;
        const userId = req.user.id;
        const seats = req.body.seats;

        const [train] = await db.query(
            'SELECT available_seats FROM trains WHERE id = ?',
            [trainId]
        );

        if (!train || train.available_seats < seats) {
            return res.status(400).json({ error: 'Not enough available seats' });
        }

        const [result] = await db.query(
            'UPDATE trains SET available_seats = available_seats - ? WHERE id = ? AND available_seats >= ?',
            [seats, trainId, seats]
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: 'No available seats after update' });
        }

        const [booking] = await db.query(
            'INSERT INTO bookings (user_id, train_id, seats) VALUES (?, ?, ?)',
            [userId, trainId, seats]
        );

        res.json({ message: 'Seat(s) booked successfully', bookingId: booking.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


const getBookingDetails = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const [result] = await db.query('SELECT * FROM bookings WHERE id = ?', [bookingId]);
        
        if (result.length === 0) {
            return res.status(404).json({ error: "Booking not found" });
        }
        
        res.json(result[0]);  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const userId = req.user.id;

        const [booking] = await db.query(
            'SELECT train_id, seats FROM bookings WHERE id = ? AND user_id = ?',
            [bookingId, userId]
        );

        if (!booking) {
            return res.status(400).json({ error: 'Booking not found or not authorized' });
        }

        const { train_id, seats } = booking;

        const [result] = await db.query(
            'UPDATE trains SET available_seats = available_seats + ? WHERE id = ?',
            [seats, train_id]
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: 'Error updating train seats' });
        }

        const [deleteBooking] = await db.query(
            'DELETE FROM bookings WHERE id = ? AND user_id = ?',
            [bookingId, userId]
        );

        if (deleteBooking.affectedRows === 0) {
            return res.status(400).json({ error: 'Error deleting booking' });
        }

        res.json({ message: 'Booking canceled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


module.exports={getBookingDetails,bookSeat, cancelBooking};