const express = require('express');
const { userRegister, userLogin,adminRegister,adminLogin } = require('../controllers/authController');
const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/admin/register', adminRegister);
router.post('/admin/login', adminLogin);

module.exports = router;