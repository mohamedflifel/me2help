// ← compute gratitude count + insight

const  message = require('../models/message.model');
const session = require('../models/session.model');

const GRATITUDE_KEYWORDS = ['grateful', 'thankful', 'appreciate', 'blessed', 'thank'];

const computeMonthlySummary = async (userId, month, year) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);

  const sessions = await message.find({ userId, createdAt: { $gte: start, $lt: end } });
  const sessionIds = sessions.map((s) => s._id);

  const messages = await message.find({ sessionId: { $in: sessionIds }, sender: 'user' });

  const gratitudeCount = messages.filter((m) =>
    GRATITUDE_KEYWORDS.some((kw) => m.text.toLowerCase().includes(kw))
  ).length;

  return {
    sessionCount: sessions.length,
    gratitudeCount,
    insight: `You had ${sessions.length} reflection sessions this month and expressed gratitude ${gratitudeCount} times.`,
  };
};

module.exports = computeMonthlySummary;