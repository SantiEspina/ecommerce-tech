const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const { User } = require('./db.js');
const jwt = require("jsonwebtoken");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const {
    SECRETO,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
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

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/googleCallback",
    session: false
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const user = await User.findOrCreate({ 
        where: { email: profile.email },
        defaults: {
            name: profile.given_name,
            username: profile.displayName,
            email: profile.email,
            photoURL: profile.picture
        }
    });done(null, user[0])
  }
));

module.exports = passport;
