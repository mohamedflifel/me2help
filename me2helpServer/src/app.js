const dotenv =require('dotenv');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route.js');
const chatRoutes = require('./routes/message.route.js');
const sessionRoutes = require('./routes/session.route.js');
const summaryRoutes = require('./routes/monthly_summary.route.js');
const emotionRoutes = require('./routes/emotion.route.js');
const errorMiddleware = require('./middleware/error.middleware.js');



dotenv.config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);


const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/summary', summaryRoutes);
app.use('/api/emotion', emotionRoutes);


app.use(errorMiddleware);


module.exports = app;
