/**
 * emotion-client.js
 * Express server — Node.js bridge to the Python Emotion Detection API.
 *
 * Start Python first:   python ../app.py        (runs on port 5000)
 * Then start this:      npm start               (runs on port 3000)
 * Test in Postman:      http://localhost:3000/...
 */

const express = require("express");
const axios   = require("axios");

const app  = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON bodies
app.use(express.json());

const PYTHON_API = "http://127.0.0.1:5000";

// ── Routes ────────────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Emotion Detection Bridge! Use /predict to analyze emotions. \n nodejs is running on port " + PORT });
});


// GET /health  — checks both this server and the Python service
app.get("/health", async (req, res) => {
  try {
    const { data } = await axios.get(`${PYTHON_API}/health`);
    res.json({ node: "ok", python: data });
  } catch (err) {
    res.status(503).json({ node: "ok", python: "unreachable", error: err.message });
  }
});

// POST /predict  — single text emotion prediction
// Body: { "text": "I feel amazing today!" }
app.post("/predict", async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ error: "'text' field is required and must be a non-empty string." });
  }

  try {
    const { data } = await axios.post(`${PYTHON_API}/predict`, { text });
    res.json(data);
  } catch (err) {
    const status = err.response?.status || 502;
    const message = err.response?.data || err.message;
    res.status(status).json({ error: "Python API error", details: message });
  }
});

// POST /predict/batch  — multiple texts in one request
// Body: { "texts": ["I'm sad", "I'm happy", "I'm scared"] }
app.post("/predict/batch", async (req, res) => {
  const { texts } = req.body;

  if (!Array.isArray(texts) || texts.length === 0) {
    return res.status(400).json({ error: "'texts' field is required and must be a non-empty array." });
  }

  try {
    const { data } = await axios.post(`${PYTHON_API}/predict/batch`, { texts });
    res.json(data);
  } catch (err) {
    const status = err.response?.status || 502;
    const message = err.response?.data || err.message;
    res.status(status).json({ error: "Python API error", details: message });
  }
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[Node.js] Emotion bridge running on http://localhost:${PORT}`);
  console.log(`[Node.js] Forwarding requests to Python API at ${PYTHON_API}`);
});
