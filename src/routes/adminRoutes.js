const express = require('express');
const { authenticateAdmin } = require('../middlewares/authMiddleware');
const { addTrain,updateTrain, deleteTrain } = require('../controllers/adminController');
const {checkApiKey} = require('../middlewares/apiKeyMiddleware');
const router = express.Router();

router.post('/train',checkApiKey , authenticateAdmin, addTrain);
router.post('/train/:id',checkApiKey , authenticateAdmin, updateTrain);
router.delete('/train/:id',checkApiKey , authenticateAdmin, deleteTrain);



module.exports = router;