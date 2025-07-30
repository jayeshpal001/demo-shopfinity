const express = require('express');
const createUser = require('../controllers/createUser');
const loginUser = require('../controllers/loginUser');
const { loginLimiter } = require('../utils/rateLimiters');
const verifyOTP = require('../controllers/verifyOTP');


const router = express.Router(); 

router.post('/register', createUser);
router.post('/login',loginLimiter, loginUser); 
router.post('/register/verify-otp', verifyOTP) 

module.exports = router; 