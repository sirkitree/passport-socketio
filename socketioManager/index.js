module.exports = function(io, server, passport) {
  var socketio = io.listen(server)

  socketio.set('authorization', passport.authorize({ /* settings */}))
  socketio.sockets.on('connection', function(socket) {
    // join
    // emit
    // set
    // on
  })
}