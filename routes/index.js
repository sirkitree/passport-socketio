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

  // router.get('/', function(req, res) {
  //   res.sendFile(path.join(__dirname, '../public/index.html'))
  // })

  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/login')
  })

  router.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/login.html'))
  })

  router.post('/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'
    }),
    function(req, res) {
      res.render('authorized.html')
    }
  )

  // routes
  app.use('/', router)

}