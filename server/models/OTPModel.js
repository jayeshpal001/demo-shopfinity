const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
    },
    otp: {
        type: String,
        required: true,
    },
    otpExpiry: {
        type: Date,
        required: true,
        index: { expires: 0 }
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // document auto-deletes in 5 min
    }
}, { timestamps: true });

OTPSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("OTPModel", OTPSchema); 