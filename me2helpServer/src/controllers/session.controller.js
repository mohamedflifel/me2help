// ← getSessions, getSessionById, createSession, deleteSession

const session = require('../models/session.model');
const message = require('../models/message.model');

const getSessions = async (req, res) => {
  const sessions = await session.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(sessions);
};

const getSessionById = async (req, res) => {
  const sessionData = await session.findOne({ _id: req.params.id, userId: req.user.id });
  if (!sessionData) { res.status(404).json({ message: 'Session not found' }); return; }

  const messages = await message.find({ sessionId: sessionData._id }).sort({ createdAt: 1 });
  res.json({ ...sessionData.toObject(), messages });
};

const createSession = async (req, res) => {
  const sessionData = await session.create({ userId: req.user.id, title: req.body.title });
  res.status(201).json(sessionData);
};

const deleteSession = async (req, res) => {
  await session.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  await message .deleteMany({ sessionId: req.params.id });
  res.json({ message: 'Session deleted' });
};

module.exports = { getSessions, getSessionById, createSession, deleteSession };