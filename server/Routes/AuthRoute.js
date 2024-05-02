const { Signup, Login } = require('../Controllers/AuthController');
const { UserVerification } = require('../Middlewares/AuthMiddleware');
const router = require('express').Router();


// Create Auth routes
router.post('/signup', Signup);
router.post('/login', Login)
router.get('/', UserVerification);

module.exports = router;