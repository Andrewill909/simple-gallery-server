const express = require('express');
const morgan = require('morgan');
const http = require('http');
const debug = require('debug');
const config = require('./config');

const app = express();
const debugServer = debug('gallery:server');

//? logging
app.use(morgan('combined'));

//? parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//? router

//? Default error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'ERROR',
    message: err.message,
  });
});

const server = http.createServer(app);

server.listen(config.PORT);

server.on('listening', () => {
  let addr = server.address();
  let bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debugServer(`Listening on ${bind}`);
});
