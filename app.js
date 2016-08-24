'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var app = express();
var config = require('./config/config');
var dbConfig = require('./config/db');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

//routes
var routes = require('./routes');
var mUpload = require('./api/upload/index');
var img = require('./api/img')
//

//place generic stuff here
app.use(bodyparser.json());
app.use('/api/',express.static('public'));
//

//mongoose
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url);
//

//passport part
app.use(require('express-session')({
    secret:'ims', resave: false, saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
var passportInit = require('./auth/index');
passportInit(passport);
//passport part ends

//main routes
app.use('/api/',routes);
app.use('/api/',mUpload);
app.use('/api/',img);

app.listen( config.port, function(){
    console.log(" app has started listening on " + config.port );
});
