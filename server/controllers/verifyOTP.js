const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const verifyOTP = asyncHandler(async (req, res)=>{
    const {email, otp} = req.body;
    const user = await User.findOne({email}); 
    if (!user) {
       res.status(400); 
       throw new Error("Invalid OTP or EMAIL");
    }
    if (user.otpExpiry<Date.now()) {
        res.status(400); 
        throw new Error("OTP expired");
    }
    const isMatch = await bcrypt.compare(otp, user.otp); 
    if (!isMatch) {
        res.status(400); 
        throw new Error("Invalid OTP");
    }
    user.isVerified = true; 
    user.otp = undefined; 
    user.otpExpiry = undefined; 
    await user.save(); 
    res.status(200).json({message: "Email verified successfully", user}); 
})
module.exports = verifyOTP; 