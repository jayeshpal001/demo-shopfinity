const express = require('express');
const createUser = require('../controllers/createUser');
const loginUser = require('../controllers/loginUser');
const { loginLimiter } = require('../utils/rateLimiters');
const verifyRegisterOTP = require('../controllers/verifyRegisterOTP');
const verifyLoginOtp = require('../controllers/verifyLoginOtp');


const router = express.Router(); 

router.post('/register', createUser);
router.post('/login',loginLimiter, loginUser); 
router.post('/register/verify-otp', verifyRegisterOTP) 
router.post('/login/verify-otp', verifyLoginOtp) 
module.exports = router; 