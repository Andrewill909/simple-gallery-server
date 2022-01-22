const express = require('express');
const morgan = require('morgan');
const http = require('http');
const debug = require('debug');
const cors = require('cors');
const config = require('./config');
const path = require('path');

//? Router
const feedRouter = require('./Router/feed');

const app = express();
const debugServer = debug('gallery:server');

//? logging
app.use(morgan('combined'));

//? parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

//? CORS handler
app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
  })
);

//? router
app.use('/api', feedRouter);

//? Default error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'ERROR',
    message: err.isAxiosError ? 'Internal Server Error' : err.message,
  });
});

const server = http.createServer(app);

server.listen(config.PORT);

server.on('listening', () => {
  let addr = server.address();
  let bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debugServer(`Listening on ${bind}`);
});
