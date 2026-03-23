"""
Emotion Detection API — Bridge between Node.js and the ML model.

Endpoints:
  POST /predict        → { "text": "..." }  → emotion + probabilities
  GET  /health         → server status check
"""

import os
import joblib
import neattext.functions as nfx
from flask import Flask, request, jsonify
from flask_cors import CORS

# ── Config ─────────────────────────────────────────────────────────────────────
BASE_DIR   = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "emotion_classifier_pipe_lr_03_june_2021.pkl")
PORT       = int(os.environ.get("PORT", 5001))  # default to 5001 if PORT env var is not set

# ── Load model once at startup ──────────────────────────────────────────────────
print(f"[INFO] Loading model from: {MODEL_PATH}")
model = joblib.load(MODEL_PATH)
print("[INFO] Model loaded successfully.")

# ── Flask app ───────────────────────────────────────────────────────────────────
app = Flask(__name__)
CORS(app)   # allow cross-origin requests from Node.js


def clean_text(text: str) -> str:
    """Apply the same cleaning steps used during training."""
    text = nfx.remove_userhandles(text)
    text = nfx.remove_stopwords(text)
    return text


@app.route("/health", methods=["GET"])
def health():
    """Simple liveness check for Node.js to verify the Python service is up."""
    return jsonify({"status": "ok", "model": "emotion_classifier_pipe_lr"}), 200


@app.route("/", methods=["GET"])
def index():
    return jsonify({"message": "Welcome to the Emotion Detection API! Flask server is running."}), 200

@app.route("/predict", methods=["POST"])
def predict():
    """
    Accepts JSON body: { "text": "<input sentence>" }
    Returns:
    {
        "text":        "<original text>",
        "emotion":     "<predicted label>",
        "confidence":  0.92,
        "probabilities": {
            "anger": 0.01,
            "fear":  0.05,
            ...
        }
    }
    """
    data = request.get_json(force=True, silent=True)

    if not data or "text" not in data:
        return jsonify({"error": "Request body must be JSON with a 'text' field."}), 400

    raw_text = str(data["text"]).strip()
    if not raw_text:
        return jsonify({"error": "'text' field must not be empty."}), 400

    cleaned = clean_text(raw_text)

    # Predict
    predicted_emotion  = model.predict([cleaned])[0]
    probabilities      = model.predict_proba([cleaned])[0]
    classes            = model.classes_

    prob_dict    = {cls: round(float(prob), 4) for cls, prob in zip(classes, probabilities)}
    confidence   = round(float(max(probabilities)), 4)

    return jsonify({
        "text":          raw_text,
        "emotion":       predicted_emotion,
        "confidence":    confidence,
        "probabilities": prob_dict,
    }), 200


@app.route("/predict/batch", methods=["POST"])
def predict_batch():
    """
    Accepts JSON body: { "texts": ["sentence 1", "sentence 2", ...] }
    Returns a list of prediction objects (same shape as /predict).
    """
    data = request.get_json(force=True, silent=True)

    if not data or "texts" not in data or not isinstance(data["texts"], list):
        return jsonify({"error": "Request body must be JSON with a 'texts' array."}), 400

    results = []
    for raw_text in data["texts"]:
        raw_text = str(raw_text).strip()
        cleaned  = clean_text(raw_text)

        predicted_emotion = model.predict([cleaned])[0]
        probabilities     = model.predict_proba([cleaned])[0]
        classes           = model.classes_

        prob_dict  = {cls: round(float(p), 4) for cls, p in zip(classes, probabilities)}
        confidence = round(float(max(probabilities)), 4)

        results.append({
            "text":          raw_text,
            "emotion":       predicted_emotion,
            "confidence":    confidence,
            "probabilities": prob_dict,
        })

    return jsonify({"results": results}), 200


# ── Entry point ─────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print(f"[INFO] Starting Emotion API on http://0.0.0.0:{PORT}")
    app.run(host="0.0.0.0", port=PORT, debug=False)
