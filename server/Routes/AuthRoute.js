const { Signup, Login } = require('../Controllers/AuthController');
const router = require('express').Router();


// Create Auth routes
router.post('/signup', Signup);
router.post('/login', Login)

module.exports = router;