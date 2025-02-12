const express = require('express');
const { getTrains, getTrainDetails } = require('../controllers/trainController');
const router = express.Router();

router.get('/', getTrains);
router.get('/:id', getTrainDetails);

module.exports = router;