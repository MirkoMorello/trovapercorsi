var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var config = require('../config/database');
var bcrypt = require('bcryptjs');


module.exports = function(passport){
    //strategia locale
    passport.use(new LocalStrategy(function(username, password, done){
        // match username
        let query = {username:username};
        User.findOne(query, function(err, user){
            if (err) throw err;
            if (!user){
                console.log("no user found");
                return done(null, false, {message: 'No user found'});
            }
            // in caso l'user c'è, comparo hash passwords
            bcrypt.compare(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){ //password matchano
                    console.log("password corretta, logged");;
                    return done(null, user);
                }else{
                    console.log("password errata")
                    return done(null, false, {message : 'Wrong password'});
                }
            });
        });
    }));


    passport.serializeUser(function(user, done){
        done(null, user.id);
    })


    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    })


}