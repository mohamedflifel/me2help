// ← sendMessage (calls Gemini/OpenAI)

const message = require('../models/message.model');
const MonthlySummary = require('../models/monthly_summary.model');
const Session = require('../models/session.model');
const getAIResponse = require('../services/ai.service');
const { predictEmotion } = require('../services/emotion.service');

const sendMessage = async (req, res) => {
  const { sessionId, messages } = req.body;
  const userId = req.user.id;

  // Detect emotion from user message
  const lastUserMsg = messages[messages.length - 1];
  let emotion = null;
  try {
    const result = await predictEmotion(lastUserMsg.text);
    emotion = result.emotion || null;
  } catch {
    emotion = null; // Python API unavailable — continue without emotion
  }

  // Get AI response based on detected emotion
  const aiText = await getAIResponse(messages, emotion);

  // Save one document: user text + AI response + emotion
  const exchange = await message.create({
    sessionId,
    textUser: lastUserMsg.text,
    aiResponse: aiText,
    emotion
  });

  // Update session: last message preview + updatedAt
  await Session.findByIdAndUpdate(sessionId, {
    lastMessage: lastUserMsg.text.slice(0, 60), // first 60 chars as preview
    updatedAt: new Date()
  });

  // Update MonthlySummary emotion count
  if (emotion) {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const emotionField = `emotions.${emotion}`;
    await MonthlySummary.findOneAndUpdate(
      { userId, month, year },
      { $inc: { [emotionField]: 1 } },
      { upsert: true }
    );
  }

  res.json({ id: exchange._id, aiResponse: aiText, emotion, timestamp: exchange.timestamp });
};

module.exports = sendMessage;