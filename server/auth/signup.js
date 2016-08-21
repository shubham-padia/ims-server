'use strict';

var signup = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var User = require('../schemas/user');

module.exports = function(passport){
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null); 
    };

    passport.use('signup',new localStrategy({
        passReqToCallback: true
    })),
    function(req,username,password,done){
        User.findOne({ 'username' : username},function(err,user){
            if(err){
                return done(err,req.flash('message','Error signing you up'));
            }
            if(user){
                return done(null, false, req.flash('message','The specified username already exists'));
            } else{
                var newUser = User();
                newUser.name = req.params.name;
                newUser.email = req.params.email;
                newUser.username = username;
                newUser.password = createHash(password);
            }

            newUser.save(function(err){
                if(err){
                    console.log("error saving the user");
                    return done(null, false, req.flash('message','Error saving your details'));
                } else {
                    return done(null, newUser, req.flash('message','Registration Successful'));
                }
            })
        })
    }
};