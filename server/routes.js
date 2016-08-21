'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
module.exports = router;

router.post('/signup',    passport.authenticate('signup',{
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));

router.post('/login',passport.authenticate('login',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));