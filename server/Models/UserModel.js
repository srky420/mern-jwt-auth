const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Create User schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Your Email address is required'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Your username is required']
    },
    password: {
        type: String,
        required: [true, 'Your password is required']
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

// Create password hash before saving the instance
userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12);
});

// Export User model
module.exports = mongoose.model('User', userSchema);