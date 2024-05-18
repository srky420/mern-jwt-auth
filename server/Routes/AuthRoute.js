const { Signup, Login } = require('../Controllers/AuthController');
const { Home } = require('../Controllers/HomeController');
const { UserVerification } = require('../Middlewares/AuthMiddleware');
const router = require('express').Router();


// Create Auth routes
router.post('/signup', Signup);
router.post('/login', Login)
router.post('/', UserVerification, Home);

module.exports = router;