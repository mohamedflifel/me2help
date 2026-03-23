const axios = require('axios');
const PYTHON_API = process.env.PYTHON_API || 'http://127.0.0.1:5001';

const predictEmotion = async (text) => {
  const { data } = await axios.post(`${PYTHON_API}/predict`, { text });
  return data;
};

const predictEmotionBatch = async (texts) => {
  const { data } = await axios.post(`${PYTHON_API}/predict/batch`, { texts });
  return data;
};

const checkPythonHealth = async () => {
  const { data } = await axios.get(`${PYTHON_API}/health`);
  return data;
};

module.exports = { predictEmotion, predictEmotionBatch, checkPythonHealth };