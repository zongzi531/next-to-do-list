// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
import errorHandler from 'errorHandler';
import server from './app';

const port = process.env.PORT || 3000;

const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  /**
   * Error Handler. Provides full stack - remove for production
   */
  server.use(errorHandler());

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log('> Ready on http://localhost:%d', port);
  });
});
