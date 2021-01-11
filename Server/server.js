const express = require('express');
const next = require('next');
const logger = require('morgan');
const helmet = require('helmet');

const { ENVIRONMENT, PORT } = require('./serverConfig');
const { PRODUCTION_URL } = require('../config/default');
const dbConnect = require('./Helper/dbConnect');
const compression = require('compression');

const dev = ENVIRONMENT;
const port = PORT;

const ROOT_URL = dev ? `http://localhost:${port}` : PRODUCTION_URL;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  dbConnect();
  if (!dev) {
    server.use(helmet());
    server.use(compression());
  }

  server.use(express.json());
  server.use(
    logger('dev', {
      skip: (req) => req.url.includes('_next'),
    })
  );

  server.get('*', (req, res) => {
    handle(req, res);
  });

  server.use((err, req, res, next) => {
    const { status = 500, message } = err;
    res.status(status).json(message);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server listening on ${ROOT_URL}`);
  });
});
