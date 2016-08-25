'use strict';

var localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var User = require('../schemas/user');
var uuid = require('node-uuid');

module.exports = function(passport){
    var createHash = function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null); 
    };

    passport.use('signup',new localStrategy({
        passReqToCallback: true
    },
    function(req,username,password,done){
        console.log("we're here");
        User.findOne({ 'username' : username},function(err,user){
            if(err){
                return done(err,console.log('Error signing you up'));
            }
            if(user){
                return done(null, false, console.log('The specified username already exists'));
            } else{
                var newUser = User();
                newUser.id = uuid.v4();
                newUser.name = req.body.name;
                newUser.email = req.body.email;
                newUser.username = username;
                newUser.password = createHash(password);
            }

            newUser.save(function(err){
                if(err){
                    return done(err, false, console.log('Error saving your details'));
                } else {
                    return done(null, newUser, console.log('Registration Successful'));
                }
            })
        })
    }));
};