module.exports = function(passport) {
  var LocalStrategy = require('passport-local').Strategy
    , GitHubStrategy = require('passport-github2').Strategy
    , GITHUB_CLIENT_ID = '-- your client id --'
    , GITHUB_CLIENT_SECRET = '-- your client secret --'
    , GITHUB_CALLBACK = 'http://tugboatui.local:8181/auth/github/callback' // this needs to match what you use in your github app

  passport.serializeUser(function(user, done) {
    console.log('serializeUser', user)
    done(null, user)
  })

  passport.deserializeUser(function(user, done) {
    console.log('deserializeUser', user)
    done(null, user)
  })

  passport.use(new LocalStrategy(
    function (username, password, done) {
      if ((username === 'admin') && (password === 'bitner')) {
        return done(null, {
            username: username,
            password: password
        })
      } else {
        return done(null, false)
      }
    }
  ))

  passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK
  },
  function(accessToken, refreshToken, profile, done) {
    // create user in mongodb
    process.nextTick(function() {
      // profile is the github profile. we will want to search our db for this
      // user and return that instead
      return done(null, profile)
    })

  }))

}