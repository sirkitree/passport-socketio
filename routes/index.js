module.exports = function(express, app, passport) {
  var router = express.Router()
    , path = require('path')

  router.use(function(req, res, next) {
    // we'll be able to utilize authentication here later
    console.log(req.method, req.url)
    next()
  })

  // renders index within public by default
  router.use(express.static('public'))

  router.get('/authorized', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/authorized.html'))
  })

  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/login')
  })

  router.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/login.html'))
  })

  router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      console.log(arguments)
      if (err) { return next(err) }
      if (!user) { return res.redirect('/login') }
      req.logIn(user, function(err) {
        if (err) { return next(err) }
        console.log('LOGGING IN')
        return res.redirect('/authorized')
      })
    })(req, res, next)
  })

  // routes
  app.use('/', router)

}