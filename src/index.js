require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('express-http-proxy');
const logger = require('./logger');
const router = require('./router');

const app = express();
const PORT = process.env.PORT || 3000;
const GAME_SERVERS = (process.env.GAME_SERVERS || 'localhost:7777').split(',');

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    path: req.path,
    ip: req.ip
  }, 'Incoming request');
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Proxy routes for game servers
app.use('/game', (req, res, next) => {
  const selectedServer = router.selectServer(GAME_SERVERS);
  logger.info({ selectedServer }, 'Routing to server');
  
  const proxy = createProxyMiddleware({
    target: `http://${selectedServer}`,
    changeOrigin: true,
    onError: (err, req, res) => {
      logger.error({ error: err.message }, 'Proxy error');
      res.status(503).json({ error: 'Service unavailable' });
    }
  });
  
  proxy(req, res, next);
});

// Error handling
app.use((err, req, res, next) => {
  logger.error({ error: err }, 'Unhandled error');
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  logger.info({ port: PORT }, 'Gaming proxy server started');
});