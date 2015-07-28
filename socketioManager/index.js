module.exports = function(io, server, passport, sessionStore) {
  var socketio = io.listen(server)
    , passSock = require('passport.socketio')

  var authSuccess = function(data, accept) {
    console.log('success connect socket.io')
    accept()
  }

  var authFail = function(data, message, err, accept) {
    console.log('fail connect socket.io', message)
    if (err) accept(new Error(message))
  }

  socketio.use(passSock.authorize({
    cookieParser: require('cookie-parser'),
    key: 'connect.sid',
    secret: 'whatever44',
    store: sessionStore,
    success: authSuccess,
    fail: authFail,
    passport: passport // see https://github.com/jfromaniello/passport.socketio/issues/61
  }))

  socketio.on('connection', function(socket) {
    // connection happens in /authorized
    console.log('socket named %s connected', socket.nsp.name)
    // join
    // emit
    // set
    // on
  })
}