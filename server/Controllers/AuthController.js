const { createSecretToken } = require('../util/SecretToken');
const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');


// Controller for Signup
module.exports.Signup = async (req, res, next) => {
    try {   
        // Get payload data from body
        const { username, email, password, createdAt } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: 'User already exists' });
        }

        // Create new user if does not exist
        const user = await User.create({
            email: email,
            username: username,
            password: password,
        });

        // Generate JWToken for the user
        const token = createSecretToken(user._id);

        // Set the token in cookie
        res.cookie('token', token, {
            withCredentials: true,
            httpOnly: false
        });

        // Send 201 JSON res
        res.status(201).json({
            message: 'User signed in succesfully',
            success: true,
            user
        });

        // Call next
        next();
    }
    catch (e) {
        console.error(e);
    }
}


// Controller for Login
module.exports.Login = async (req, res, next) => {
    try {
        // Get the login credentials from req body
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: 'All fields are required' })
        }

        // Get the user from DB
        const user = await User.findOne({ email: email });

        // If not found
        if (!user) {
            return res.json({ message: 'Invalid username or password' })
        }

        // Check password match
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.json({ message: 'Invalid username or password' })
        }

        // Generate new token
        const token = createSecretToken(user.id);

        // Set cookie
        res.cookie('token', token, {
            withCredentials: true,
            httpOnly: false
        });

        // 200 json response
        res.status(200).json({ 
            message: 'User logged in successfully',
            success: true,
        });

        // Call next
        next();
    }   
    catch (e) {
        console.error(e);
    }
}

