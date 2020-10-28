var dotenv = require('dotenv').config();

var http = require('http');
var createError = require('http-errors');
var express = require('express');
var path = require('path');

const { randomBytes } = require('crypto');
const { now } = require('moment');
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3',
  },
  useNullAsDefault: true,
  debug: true
});

var port = normalizePort(process.env.SERVER_PORT || '5003');

var app = express();
app.set('port', port);

// // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json({limi: "5mb"}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/save-json', function (req, res) {
  const url = now() + randomBytes(4).toString('hex');
  knex('urls').insert({
    url: url,
    json: req.body.params
  }).then((query_result) => {
    res.json({
      url: url
    }, 201);
  });
});

app.get('/view/:url', function (req, res) {
  knex('urls').where({
    url: req.params.url
  })
  .select('json')
  .then((query_result) => {
    if (query_result == null || query_result == 0) {
      res.render('404');
      return;
    }
    res.sendFile(path.resolve(__dirname + '/public/view/index-json.html'));
  });
});

app.get('/load-json/:url', function (req, res) {
  knex('urls').where({
    url: req.params.url
  })
  .select('json')
  .then((query_result) => {
    if (query_result == null || query_result == 0) {
      res.status(404).json('no');
      return;
    }
    res.json(query_result[0]);
  });
});


app.get('/*', (req, res, next) => {
  if (req.url === "/save-json") return next();
  res.sendFile(path.resolve(__dirname + '/public/index.html'));
});

console.log(app._router.stack.filter(r => r.route)
  .map(r => [r.route.path, r.route.methods])
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Express: Listening on ' + bind);

}

module.exports = app;
