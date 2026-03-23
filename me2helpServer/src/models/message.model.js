//a single chat exchange (user message + AI response)

const mongoose = require('mongoose');


const message = mongoose.model('Message', {
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    textUser: {
        type: String,
        required: true       // user's message
    },
    aiResponse: {
        type: String,
        default: null        // AI reply (null if not yet received)
    },
    emotion: {
        type: String,
        default: null        // detected from textUser
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});

module.exports = message;