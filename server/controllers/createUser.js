const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const sendEmail = require('../utils/sendEmail');

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
    const user = await User.create({ name, email, password });

   await sendEmail(
        email, 
        "Email verification", 
        `<h1>Hellow ${name} welcome to backend</h1/`
    )

    res.status(201).json({
        success: true,
        message: "User created successfully",
        user
    })
})

module.exports = createUser; 