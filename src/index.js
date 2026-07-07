require('dotenv').config();
const express = require('express');
const path = require('path');
const pino = require('pino');
const httpProxy = require('http-proxy');
const gameRouter = require('./router');

// Initialize logger
const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
});

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Parse game servers from environment
const GAME_SERVERS = (process.env.GAME_SERVERS || 'localhost:8080,localhost:8081,localhost:8082').split(',');

// Initialize HTTP proxy
const proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    timeout: parseInt(process.env.API_TIMEOUT || 30000)
});

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API endpoint to get all games
app.get('/api/games', (req, res) => {
    try {
        const games = require('./games-list.js');
        res.json({
            success: true,
            data: games,
            count: games.length
        });
    } catch (error) {
        logger.error('Error fetching games:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch games'
        });
    }
});

// API endpoint to search games
app.get('/api/games/search', (req, res) => {
    try {
        const query = req.query.q?.toLowerCase() || '';
        const games = require('./games-list.js');
        
        if (!query) {
            return res.json({
                success: true,
                data: games
            });
        }

        const filtered = games.filter(game => 
            game.title.toLowerCase().includes(query) ||
            game.genre.toLowerCase().includes(query) ||
            game.tags.some(tag => tag.includes(query))
        );

        res.json({
            success: true,
            data: filtered,
            query: query
        });
    } catch (error) {
        logger.error('Error searching games:', error);
        res.status(500).json({
            success: false,
            error: 'Search failed'
        });
    }
});

// API endpoint to get games by genre
app.get('/api/games/genre/:genre', (req, res) => {
    try {
        const genre = req.params.genre.toLowerCase();
        const games = require('./games-list.js');
        
        const filtered = games.filter(game => game.genre === genre);

        res.json({
            success: true,
            data: filtered,
            genre: genre,
            count: filtered.length
        });
    } catch (error) {
        logger.error('Error filtering by genre:', error);
        res.status(500).json({
            success: false,
            error: 'Filter failed'
        });
    }
});

// Proxy server status endpoint
app.get('/api/proxy/status', (req, res) => {
    try {
        const status = gameRouter.getServerStatus(GAME_SERVERS);
        res.json({
            success: true,
            servers: status,
            totalServers: GAME_SERVERS.length,
            activeServers: status.filter(s => s.avgLatency > 0).length
        });
    } catch (error) {
        logger.error('Error getting proxy status:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get proxy status'
        });
    }
});

// Get available game servers
app.get('/api/proxy/servers', (req, res) => {
    try {
        res.json({
            success: true,
            servers: GAME_SERVERS,
            count: GAME_SERVERS.length
        });
    } catch (error) {
        logger.error('Error getting servers:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get servers'
        });
    }
});

// Select best server for a game request
app.get('/api/proxy/select', (req, res) => {
    try {
        const selectedServer = gameRouter.selectServer(GAME_SERVERS);
        
        // Simulate latency recording (in production, actual latency would be measured)
        const simulatedLatency = Math.floor(Math.random() * 100) + 10;
        gameRouter.recordLatency(selectedServer, simulatedLatency);
        
        res.json({
            success: true,
            selectedServer: selectedServer,
            latency: simulatedLatency,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        logger.error('Error selecting server:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to select server'
        });
    }
});

// Proxy endpoint for game requests - routes through selected server
app.use('/api/proxy/game/:gameId', (req, res) => {
    try {
        const gameId = req.params.gameId;
        const selectedServer = gameRouter.selectServer(GAME_SERVERS);
        
        logger.info(`Routing game ${gameId} to server ${selectedServer}`);
        
        const targetUrl = `http://${selectedServer}/game/${gameId}`;
        
        // Record latency timing
        const startTime = Date.now();
        
        proxy.web(req, res, { target: targetUrl }, (error) => {
            const latency = Date.now() - startTime;
            gameRouter.recordLatency(selectedServer, latency);
            
            if (error) {
                logger.error(`Proxy error for game ${gameId}:`, error);
                res.status(503).json({
                    success: false,
                    error: 'Game server unavailable',
                    server: selectedServer
                });
            }
        });
    } catch (error) {
        logger.error('Proxy routing error:', error);
        res.status(500).json({
            success: false,
            error: 'Proxy routing failed'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        gameServers: GAME_SERVERS.length
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Not found'
    });
});

// Start server
app.listen(PORT, () => {
    logger.info(`🎮 Fuzzy Goggles Game Proxy Hub running on http://localhost:${PORT}`);
    logger.info(`📊 Games API available at http://localhost:${PORT}/api/games`);
    logger.info(`🔍 Search available at http://localhost:${PORT}/api/games/search?q=query`);
    logger.info(`🌐 Proxy Status available at http://localhost:${PORT}/api/proxy/status`);
    logger.info(`📡 Game Servers: ${GAME_SERVERS.join(', ')}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', () => {
    logger.info('SIGINT signal received: closing HTTP server');
    process.exit(0);
});
