module.exports = function(passport) {
  var LocalStrategy = require('passport-local').Strategy

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new LocalStrategy(
    function (username, password, done) {
      if ((username === 'admin') && (password === 'bitner')) {
        console.log("user login...");
        return done(null, {
            username: username,
            password: password
        })
      } else {
        return done(null, false)
      }
    }
  ));

}