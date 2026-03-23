const express = require('express');
const router = express.Router();

const { register, login, logout, getMe } = require('../controllers/auth.controller');
const protect = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

// Method: GET
// URL: http://localhost:5000/api/auth/me
// Header: Authorization: Bearer <your_token>


module.exports = router;