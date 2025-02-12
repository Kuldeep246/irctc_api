const db = require('../config/db');

const bookSeat = async (req, res) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const { trainId } = req.params;
        const userId = req.user.id;
        const seats = req.body.seats;

        const [trains] = await connection.query(
            'SELECT available_seats FROM trains WHERE id = ? FOR UPDATE',
            [trainId]
        );

        if (trains.length === 0 || trains[0].available_seats < seats) {
            await connection.rollback();
            return res.status(400).json({ error: 'Not enough available seats' });
        }

        const [updateResult] = await connection.query(
            'UPDATE trains SET available_seats = available_seats - ? WHERE id = ?',
            [seats, trainId]
        );

        if (updateResult.affectedRows === 0) {
            await connection.rollback();
            return res.status(400).json({ error: 'No available seats after update' });
        }

        const [booking] = await connection.query(
            'INSERT INTO bookings (user_id, train_id, seats) VALUES (?, ?, ?)',
            [userId, trainId, seats]
        );

        await connection.commit(); 
        res.json({ message: 'Seat(s) booked successfully', bookingId: booking.insertId });

    } catch (error) {
        await connection.rollback(); 
        console.error(error);
        res.status(500).json({ error: error.message });
    } finally {
        connection.release(); 
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
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const { bookingId } = req.params;
        const userId = req.user.id;

        const [bookings] = await connection.query(
            'SELECT train_id, seats FROM bookings WHERE id = ? AND user_id = ? FOR UPDATE',
            [bookingId, userId]
        );

        if (bookings.length === 0) {
            await connection.rollback();
            return res.status(400).json({ error: 'Booking not found or not authorized' });
        }

        const { train_id, seats } = bookings[0];

        const [updateSeats] = await connection.query(
            'UPDATE trains SET available_seats = available_seats + ? WHERE id = ?',
            [seats, train_id]
        );

        if (updateSeats.affectedRows === 0) {
            await connection.rollback();
            return res.status(400).json({ error: 'Error updating train seats' });
        }

        const [deleteBooking] = await connection.query(
            'DELETE FROM bookings WHERE id = ? AND user_id = ?',
            [bookingId, userId]
        );

        if (deleteBooking.affectedRows === 0) {
            await connection.rollback();
            return res.status(400).json({ error: 'Error deleting booking' });
        }

        await connection.commit();
        res.json({ message: 'Booking canceled successfully' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
};


module.exports={getBookingDetails,bookSeat, cancelBooking};