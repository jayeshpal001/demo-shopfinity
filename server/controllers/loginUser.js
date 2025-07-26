const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const bcrypt = require('bcrypt');


const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body; 
     if (!email || !password) {
        res.status(400); 
        throw new Error("All fields are required"); 
      }
    const user = await User.findOne({email}); 
    if (!user) {
        res.status(404); 
        throw new Error("Invalid email or password"); 
    }
    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) {
        res.status(401); 
        throw new Error("Invalid email or password"); 
    }
    res.status(200).json({
        success: true,
        message: "User login successfully", 
        user
    })
})

module.exports = loginUser; 