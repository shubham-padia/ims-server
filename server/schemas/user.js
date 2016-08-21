'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('user',{
    id: String,
    username: String,
    password: String,
    name: String,
    email: String
});