// ← register, login, logout, getMe

const bcrypt = require('bcrypt');
const user = require('../models/user.model');
const generateToken = require('../services/auth.service');

const register = async (req, res) => {
  const { fullname, email, password } = req.body;
  const existing = await user.findOne({ email:email });
  if (existing) { res.status(400).json({ message: 'Email already in use' }); return; }

  const hashed = await bcrypt.hash(password, 10);
  const userData = await user.create({ fullname:fullname, email:email, password: hashed });
  const token = generateToken(userData._id.toString());

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.status(201).json({ id: userData._id, name: userData.fullname, email: userData.email });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userData = await user.findOne({ email:email });
  if (!userData) { res.status(401).json({ message: 'Invalid email or password' }); return; }

  const match = await bcrypt.compare(password, userData.password);
  if (!match) { res.status(401).json({ message: 'Invalid email or password' }); return; }

  const token = generateToken(userData._id.toString());

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ id: userData._id, name: userData.fullname, email: userData.email });
};

const logout = (_req, res) => {
  console.log('User logged out');
  res.clearCookie('token', { httpOnly: true, sameSite: 'Strict' });
  res.json({ message: 'Logged out successfully' });
};

const getMe = async (req, res) => {
  const userData = await user.findById(req.user.id).select('-password');
  res.json(userData);
};

module.exports = { register, login, logout, getMe };