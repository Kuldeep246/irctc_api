const express = require('express');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { bookSeat, getBookingDetails, cancelBooking } = require('../controllers/bookingController');
const router = express.Router();

router.post('/:trainId/book', authenticateUser, bookSeat);
router.delete('/:bookingId', authenticateUser, cancelBooking);
router.get('/:bookingId', authenticateUser, getBookingDetails);
module.exports = router;