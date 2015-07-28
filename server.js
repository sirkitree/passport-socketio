var express = require('express')
  , session = require('express-session')
  , passport = require('passport')
  , io = require('socket.io')
  , app = express()
  , MongoStore = require('connect-mongo')(session)
  , mongoStore = new MongoStore({ url: 'mongodb://localhost/passSock', touchAfter: 24 * 3600 })
  , server = require('http').createServer(app)
  , passMan = require('./passportManager')(passport)
  , appMan = require('./applicationManager')(app, passport, session, mongoStore)
  , sockMan = require('./socketioManager')(io, server, passport, mongoStore)
  , router = require('./routes')(express, app, passport)

server.listen(8181, function() {
  console.log('Server listening on port 8181')
})