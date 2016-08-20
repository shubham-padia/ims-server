'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('user',{
    _id:{
        type: Schema.ObjectId,
        ref: 'user'
    },
    name: String,
    email: String,
    password: String
});