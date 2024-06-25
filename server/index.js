const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const app = require('./src/server');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (pathname === '/api/hello') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Hello from API' }));
  } else {
    app(req, res);
  }
});

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
