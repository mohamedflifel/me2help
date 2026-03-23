const { predictEmotion, predictEmotionBatch, checkPythonHealth } = require('../services/emotion.service');

const predict = async (req, res) => {
  const { text } = req.body;
  if (!text?.trim()) return res.status(400).json({ error: "'text' is required" });
  const result = await predictEmotion(text);
  res.json(result);
};

const predictBatch = async (req, res) => {
  const { texts } = req.body;
  if (!Array.isArray(texts) || texts.length === 0)
    return res.status(400).json({ error: "'texts' must be a non-empty array" });
  const result = await predictEmotionBatch(texts);
  res.json(result);
};

const health = async (req, res) => {
  try {
    const pythonStatus = await checkPythonHealth();
    res.json({ node: 'ok', python: pythonStatus });
  } catch (error) {
    res.status(503).json({ node: 'ok', python: 'unreachable' });
  }
};

module.exports = { predict, predictBatch, health };