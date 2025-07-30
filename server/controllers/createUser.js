const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const sendEmail = require('../utils/sendEmail');
const generateOtp = require('../utils/generateOtp');
const bcrypt = require('bcrypt');

const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const isExists = await User.findOne({ email });
    if (isExists) {
        res.status(409);
        throw new Error("Email already exist");
    }
    const otp = generateOtp(); 
    const otpExpiry = Date.now()+5*60*1000; 
    
    const hashOtp = await bcrypt.hash(otp, 10); 

    const user = await User.create({ name, email, password, otp: hashOtp, otpExpiry });
    

   await sendEmail(
        email, 
        "Email verification", 
        `<h1>Hellow ${name} welcome to backend Your otp is ${otp} </h1>`
    )

    res.status(201).json({
        success: true,
        message: "Registration successful. Please verify your email",
        userId: user._id
        
    })
})

module.exports = createUser; 