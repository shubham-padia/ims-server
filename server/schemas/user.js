'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('user',{
    _id:{
        type: Schema.ObjectId,
        ref: 'user'
    },
    username: String,
    password: String,
    name: String,
    email: String
});