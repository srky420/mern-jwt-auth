require('dotenv').config();
const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken');


// Define auth middleware
module.exports.UserVerification = (req, res) => {
    
    // Get token from cookies
    const token = req.cookies.token;

    // If token does not exist
    if (!token) {
        return res.json({ status: false });
    }

    // Verify token
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false });
        }
        const user = await User.findById(data.id);
        if (!user) {
            return res.json({ status: false });
        }
        return res.json({ status: true });
    })
}
