'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('vote',{
    imgName: String,
    userId: String,
    vote: Number
});