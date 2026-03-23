const express = require('express');
const router = express.Router();

const getMonthlySummary = require('../controllers/summary.controller');
const protect = require('../middleware/auth.middleware');

router.get('/', protect, getMonthlySummary);

module.exports = router;