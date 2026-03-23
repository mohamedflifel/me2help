// ← getMonthlySummary

const MonthlySummary = require('../models/monthly_summary.model');
const computeMonthlySummary  = require('../services/summary.service');

const getMonthlySummary = async (req, res) => {
  const userId = req.user.id;
  const month = parseInt(req.query.month) || new Date().getMonth() + 1;
  const year = parseInt(req.query.year) || new Date().getFullYear();

  let summary = await MonthlySummary.findOne({ userId, month, year });

  if (!summary) {
    const computed = await computeMonthlySummary(userId, month, year);
    summary = await MonthlySummary.create({ userId, month, year, ...computed });
  }

  res.json(summary);
};

module.exports = getMonthlySummary;