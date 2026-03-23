const express = require('express');
const router = express.Router();

const { getSessions, getSessionById, createSession, deleteSession } = require('../controllers/session.controller');
const protect = require('../middleware/auth.middleware');

router.use(protect);
router.get('/', getSessions);
router.get('/:id', getSessionById);
router.post('/', createSession);
router.delete('/:id', deleteSession);

module.exports = router;