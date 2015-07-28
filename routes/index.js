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

  router.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/login.html'))
  })

  router.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }),
    function(req, res) {
      // not called since request will redirect to github for auth
    })

  router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      console.log('LOGGING IN')
      res.redirect('/authorized')
    })

  router.get('/authorized', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/authorized.html'))
  })

  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/login')
  })

  function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/login')
  }

  // routes
  app.use('/', router)

}