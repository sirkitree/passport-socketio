module.exports = function(app, passport, session, sessionStore) {
  var bodyParser = require('body-parser')

  // middleware
  app.use(bodyParser.urlencoded())
  app.use(session({
    key: 'connect.sid',
    secret: 'whatever44',
    store: sessionStore
  }))
  app.use(passport.initialize())
  app.use(passport.session())

}