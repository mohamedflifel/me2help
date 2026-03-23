//a single chat conversation

const mongoose = require('mongoose');


const session = mongoose.model('Session', {
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',        // ← references the User model
        required : true,
    },
    title : {
        type: String,
        required : true,
    },
    summary : {
        type: String,
    },
    lastMessage : {
        type: String,
        default: null       // preview of the last user message
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    updatedAt : {
        type: Date,
        default: Date.now   // updated every time a new message is sent
    },
});

module.exports = session;