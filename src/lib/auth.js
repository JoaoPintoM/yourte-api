// inspired by : https://github.com/mapmeld/koa-passport-example
import passport from 'koa-passport'
import User from '../dao/models/user.js'
import { config } from '../config/config'

User.findOne({ username: 'test' }, (err, testUser) => {
  if (err) {
    throw err
  }
  if (!testUser) {
    console.log('test user did not exist; creating test user...')
    testUser = new User({
      username: 'test',
      password: 'test'
    })
    testUser.save()
  }
})

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, done)
})

const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username, password: password }, done)
}))

const FacebookStrategy = require('passport-facebook').Strategy
passport.use(new FacebookStrategy({
  clientID: config.FACEBOOK.KEY,
  clientSecret: config.FACEBOOK.SECRET,
  callbackURL: 'http://tipi.local:' + 1338 + '/auth/facebook/callback',
  profileFields: [
    'id', 'name',
    'picture.type(large)', 'emails',
    'locale',
    // 'user_birthday',
    // 'user_location',
    // 'user_likes',
    // 'user_relationships',
    'displayName', 'about', 'gender', 'age_range']
},
  (token, tokenSecret, profile, done) => {
    console.log(profile)
    User.findOne({ facebook_id: profile.id }, done)
  }
))

//
// const TwitterStrategy = require('passport-twitter').Strategy
// passport.use(new TwitterStrategy({
//     consumerKey: 'your-consumer-key',
//     consumerSecret: 'your-secret',
//     callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/twitter/callback'
//   },
//   function(token, tokenSecret, profile, done) {
//     User.findOne({ twitter_id: profile.id }, done);
//   }
// ))
//
// const GoogleStrategy = require('passport-google-auth').Strategy
// passport.use(new GoogleStrategy({
//     clientId: 'your-client-id',
//     clientSecret: 'your-secret',
//     callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback'
//   },
//   function(token, tokenSecret, profile, done) {
//     // retrieve user
//     User.findOne({ google_id: profile.id }, done);
//   }
// ))
