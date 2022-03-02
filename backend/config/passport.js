var passport         = require('passport');
var GoogleStrategy   = require('passport-google-oauth2').Strategy;
const config = require("../config/auth.config");
const db = require("../models");
const jwt = require("jsonwebtoken");
const { user: User, refreshToken: RefreshToken } = db;

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

/*
    clientID      : "823643138083-9qvc1pj19f531b3hd0dkbb37f8t2t5gm.apps.googleusercontent.com",
    clientSecret  : "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",
*/
passport.use(new GoogleStrategy(
  {
    clientID      : process.env.GOOGLE_CLIENT_ID,
    clientSecret  : process.env.GOOGLE_SECRET,
    // callbackURL   : '/auth/google/callback',
    callbackURL   : 'http://localhost:3000/auth/google/callback',
    passReqToCallback   : true
  }, async function(req, googleToken, refreshToken, profile, done){
    // console.log('profile: ', profile);
    //
    await User.findOne({
      where: {
        email: profile.email,
      }
    }).then(async (user1) => {
      //if user does not exist, register
      if (!user1) {
        await User.create({
          name: profile.displayName,
          email: profile.email,
          is_active: 1         
        }).then(async user2 =>  {
          //Generate refresh token and access token
          const token = jwt.sign({ id: user2.id }, config.secret, {
            expiresIn: config.jwtExpiration
          });
          refreshToken = await RefreshToken.createToken(user2);
          let info = {
            user: user2,
            accessToken: token,
            refreshToken: refreshToken
          }    
          req.info = info;
        })
        .catch(err => {
            console.log({ message: err.message });
        });       
      } else {
        // Generate refresh token
        refreshToken = await RefreshToken.createToken(user1);   
        const token = jwt.sign({ id: user1.id }, config.secret, {
          expiresIn: config.jwtExpiration
        });  
        let info = {
          user: user1,
          accessToken: token,
          refreshToken: refreshToken
        };
        req.info = info;
      }
    }).catch(err => {
      console.log({ message: err.message });
    });   
    
    done(null, profile);    
  }
));

module.exports = passport;