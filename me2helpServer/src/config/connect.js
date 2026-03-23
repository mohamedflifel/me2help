// ← mongoose connect

const mongoose = require('mongoose'); 

// connect to db
const connectDB = async () => {
    try {
        const dbUrl = process.env.MONGO_URI;
        console.log(`****Attempting to connect to MongoDB at ${dbUrl}...****`);
        await mongoose.connect(dbUrl);
        console.log(`Connected to ${dbUrl} successfully!`);
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};

module.exports = connectDB;