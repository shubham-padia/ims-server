'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('userImg',{
    userId: String,
    filename: String,
    desc: String,
    path: String,
    size: String,
    originalname: String     
});