<div align="center">

# 🩹 Me2Help
### *A space to think. A place to grow.*



[![Made with Love](https://img.shields.io/badge/Made%20with-%F0%9F%A9%B7-pink)](https://github.com/mohamedflifel)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?logo=python)](https://python.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://mongodb.com)

</div>

---

## 👋 The Story Behind It

I built **Me2Help** because I wanted to create something that goes beyond a typical chatbot.
Not just a Q&A machine — but a calm, thoughtful space where someone can open up, reflect, and be gently challenged to think differently.

Every line of this project was written with intention. The soft UI, the emotion detection, the careful responses — all of it was designed by hand, from the ground up.

— *Mohamed Flifel*</br>
![me2help home page](https://i.ibb.co/JRThHstQ/landing-page2.png)
![me2help register page](https://i.ibb.co/bg87ZZhc/register2.png)
![me2help chat page](https://i.ibb.co/4ZrXBv3V/real-chat-example.png)

</br>
Not everyone has access to therapy, and not everyone feels comfortable talking to people around them. me2help was built for those in-between moments — when you need to process something, but don't know where to start. It's a fullstack web application powered by a real AI model (Llama 3.3 70B via Groq) that listens, reflects, and gently challenges your thinking rather than just validating everything you say. The goal isn't to replace human connection — it's to give you a space to think out loud, track your emotional patterns over time, and feel a little less alone at 2am.

---

## 🏗️ Architecture

| Service | Technology | Default Port |
|---------|-----------|-------------|
| `me2helpClient` | React + Vite + TypeScript | 3000 |
| `me2helpServer` | Node.js + Express + MongoDB | 5000 |
| `me2helpModel` | Python + Flask + scikit-learn | 5001 |

---

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Python](https://www.python.org/) 3.9+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/MohamedFlifel/me2help.git
cd me2help
```

---

### 2. Python ML Service (`me2helpModel`)

```bash
cd me2helpAi

# Create and activate a virtual environment
python -m venv venv

# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file inside `me2helpAi/` (optional — defaults shown):

```env
PORT=5001
```

Download the pre-trained emotion model and place it in the `me2helpAi/models/` folder:

```
me2helpAi/
└── models/
    └── emotion_classifier_pipe_lr_03_june_2021.pkl   ← place the model file here
```

> The model file must be named exactly `emotion_classifier_pipe_lr_03_june_2021.pkl`.

Start the service:

```bash
python app.py
```

> The Flask service will run at `http://localhost:5001`

---

### 3. Node.js Backend (`me2helpServer`)

```bash
cd me2helpServer
npm install
```

Create a `.env` file inside `me2helpServer/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/me2help
JWT_SECRET=your_super_secret_key_here
PYTHON_API=http://localhost:5001
```

Start the server:

```bash
node index.js
```

> The server will run at `http://localhost:5000`

---

### 4. React Frontend (`me2helpClient`)

```bash
cd me2helpClient
npm install
```

Create a `.env` file inside `me2helpClient/`:

```env
back_end_API_URL=http://localhost:5000
GEMINI_API_KEY=your_gemini_api_key_here
```

Install axios explicitly, then start the development server:

```bash
npm install axios
npm run dev
```

> The app will run at `http://localhost:3000`

---

## ▶️ Running All Services

Open **three separate terminals** and run each service simultaneously:

```bash
# Terminal 1 — Python ML Service
cd me2helpAi && venv\Scripts\activate && python app.py

# Terminal 2 — Node.js Backend
cd me2helpServer && node index.js

# Terminal 3 — React Frontend
cd me2helpClient && npm run dev
```

---

## 🔐 Environment Variables Summary

### `me2helpServer/.env`

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret key for signing JWT tokens |
| `PYTHON_API` | Yes | URL of the Python ML service |
| `PORT` | No | Server port (default: `5000`) |

### `me2helpClient/.env`

| Variable | Required | Description |
|----------|----------|-------------|
| `back_end_API_URL` | No | Backend URL (default: `http://localhost:5000`) |
| `GEMINI_API_KEY` | No | Google Gemini API key |

### `me2helpAi/.env`

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Flask service port (default: `5001`) |

---

## 📦 Build for Production

```bash
cd me2helpClient
npm run build
```

The static output will be in `me2helpClient/dist/`.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

### Designed & built by [Mohamed Flifel](https://github.com/MohamedFlifel)

*"The best project you'll ever work on is yourself."*

</div>
