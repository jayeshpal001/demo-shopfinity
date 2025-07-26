const express = require('express');
const createUser = require('../controllers/createUser');
const loginUser = require('../controllers/loginUser');
const { loginLimiter } = require('../utils/rateLimiters');


const router = express.Router(); 

router.post('/register', createUser);
router.post('/login',loginLimiter, loginUser);  

module.exports = router; 