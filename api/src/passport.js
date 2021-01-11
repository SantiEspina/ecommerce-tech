const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const { User } = require('./db.js');
const jwt = require("jsonwebtoken");
const {
    SECRETO
    } = process.env;

passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password", session: false},
    async(email, password, done) => {
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if(!user) return done(null, false)
        if(!user.compare(password)) return done(null, false);
        const {
            id,name, username, email: userEmail, isAdmin, adress,
        } = user;
        return done(null, {
            id,name, username, email: userEmail, isAdmin, adress,
        });
    }
));
passport.use(
    new BearerStrategy((token, done) => {
    jwt.verify(token, SECRETO, function (err, user) {
        if (err) return done(err);
        return done(null, user ? user : false);
    });
    })
);

module.exports = passport;
