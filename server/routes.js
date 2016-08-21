'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
module.exports = router;

router.post('/signup',passport.authenticate('signup',{
    }),
    function(req,res){
        res.json({message:"Success", username: req.user.username});
    }
);

router.post('/login',passport.authenticate('login',{
    }),
    function(req,res){
        res.json({message:"Success", username: req.user.username});
    }
);