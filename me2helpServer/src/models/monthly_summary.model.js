//a single chat conversation

const mongoose = require('mongoose');


const monthlysummary  = mongoose.model('MonthlySummary ', {
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',        // ← references the User model
        required: true
    },
    month :{
        type: Number,
        required: true,
        min: 1, max: 12,

    },
    year : {
        type: Number,
        required: true,
    },
    gratitudeCount : {
        type: Number,
        default: 0
    },
    sessionCount : {
        type: Number,
        default: 0
    },
    insight : {
        type: String,
    },
    emotions : {
        type: Map,
        of: Number,
        default: {}  // e.g. { "joy": 5, "sadness": 2, "anger": 1 }
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
});

module.exports = monthlysummary ;