module.exports = function(passport) {
  var LocalStrategy = require('passport-local').Strategy

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

}