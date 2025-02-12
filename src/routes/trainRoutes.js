const express = require('express');
const { getTrains, getTrainSeats } = require('../controllers/trainController');
const router = express.Router();

router.get('/', getTrains);
router.get('/:id', getTrainSeats);

module.exports = router;