const express = require('express');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { getAllBookingDetails,getUserDetails } = require('../controllers/userController');
const router = express.Router();

router.get('/:id', authenticateUser, getUserDetails);
router.get('/:id/booking', authenticateUser, getAllBookingDetails);


module.exports = router;