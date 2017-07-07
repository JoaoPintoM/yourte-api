import passport from 'koa-passport'
import { UsersRepository } from '../dao/repositories/users'
import ColocationRequest from '../dao/models/colocationRequest.js'
import { config } from '../config/config'

const userRepo = new UsersRepository()

userRepo.User.findOne({ username: 'test' }, (err, testUser) => {
  if (err) {
    throw err
  }
  if (!testUser) {
    console.log('test user did not exist; creating test user...')
    testUser = new userRepo.User({
      username: 'test',
      password: 'test'
    })
    testUser.save((err) => {
      if (err) {
        console.log('something went really bad')
        process.exit()
      } else {
        console.log(testUser)
        const colocR = new ColocationRequest({
          user: testUser,
          price: 450
        })
        colocR.save()
      }
    })
  }
})

passport.serializeUser((user, done) => {
  console.log('serializeUser')
  console.log(user)
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  console.log('deserializeUser')
  console.log(id)
  userRepo.User.findById(id, done).lean()
})

const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy((username, password, done) => {
  userRepo.User.findOne({ username: username, password: password }, done)
}))

const FacebookStrategy = require('passport-facebook').Strategy
passport.use(new FacebookStrategy({
  clientID: config.FACEBOOK.KEY,
  clientSecret: config.FACEBOOK.SECRET,
  callbackURL: `${config.API.URL}/auth/facebook/callback`,
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
    console.log(' ° ')

    let photo = ''
    if (profile.photos && profile.photos[0].value) {
      photo = profile.photos[0].value
    }

    userRepo.getUserByFacebookId(profile.id)
      .then((user) => {
        if (!user) {
          userRepo.createUser({
            username: profile.displayName,
            facebook_id: profile.id,
            picture: photo
          }).then((r) =>
            !r ? done('jErr bad user creation') : done(null, r))
        } else {
          done(null, user)
        }
      })
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
