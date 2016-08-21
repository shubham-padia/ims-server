'use strict';

var localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var User = require('../schemas/users');

module.exports = function(passport){
    
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }

    passport.use('login', new localStrategy({
            passReqToCallback: true
        })),
    function(req, username, password, done){
        User.findOne({ 'username': username },
            function(err,user){
                if(err)
                    return done(err);
                if(!user)
                    return done(null, false, req.flash('message','User not found'));
                if(!isValidPassword(user,password)){
                    return done(null, false, req.flash('message','wrong password '));
                };

                return done(null,user);        
            });
    }    

};