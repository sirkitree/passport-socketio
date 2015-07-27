module.exports = function(app, passport, session) {
  var bodyParser = require('body-parser')

  // middleware
  app.use(bodyParser.urlencoded())
  app.use(session({
    store: new session.MemoryStore(),
    key: 'session.sid',
    secret: 'whatever44'
  }))
  app.use(passport.initialize())
  app.use(passport.session())

}