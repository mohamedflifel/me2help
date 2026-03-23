const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const { predict, predictBatch, health } = require('../controllers/emotion.controller');

router.get('/health', health);
router.post('/predict', protect, predict);
// router.post('/predict',predict); // for test we remove middleware
router.post('/predict/batch', protect, predictBatch);
// router.post('/predict/batch', predictBatch); // for test we remove middleware
module.exports = router;