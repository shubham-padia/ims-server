'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
module.exports = router;

router.post('/signup',passport.authenticate('signup',{
    }),
    function(req, res, err){
        if(err){
            res.json({success: false});
        };
        res.json({success: true, username: req.user.username});
    }
);

router.post('/login',passport.authenticate('login',{
    }),
    function(req, res){
        res.json({success: true, username: req.user.username});
    }
);

router.get('/logout', function(req, res, err) {
        if(err){
            res.json({success: false});
        };
		req.logout();
		res.json({success: true});
});    