const mongoose = require('mongoose');

const user = mongoose.model('User',{
    fullname : {
        type:String,
        default : 'guest',
    },
    email : {
        type:String,
        required : true,
        unique : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

});

module.exports = user;