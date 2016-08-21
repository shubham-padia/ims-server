'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var app = express();
var config = require('./config/config');

app.listen( config.port, function(){
    console.log(" app has started listening on " + config.port );
});

