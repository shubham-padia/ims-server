'use strict';

var localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var User = require('../schemas/user');

module.exports = function(passport){
    passport.use('login', new localStrategy({
            passReqToCallback: true
        },
    function(req, username, password, done){
        User.findOne({ 'username': username },
            function(err,user){
                if(err)
                    return done(err);
                if(!user)
                    return done(null, false, console.log('User not found'));
                if(!isValidPassword(user,password)){
                    return done(null, false, console.log('wrong password '));
                };

                return done(null,user,console.log('successfully logged in'));        
            });
    }));
    var isValidPassword = function(user, password){
        return bcrypt.compareSync(password, user.password);
    }

};