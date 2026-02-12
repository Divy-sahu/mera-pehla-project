const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    isverified: {
    type: Boolean,
    default: false
 },
 
 verifyToken: String,
  verifyTokenExpiry: Date
},
 

{
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;
