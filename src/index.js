require('dotenv').config();
const express = require('express');
const path = require('path');
const pino = require('pino');

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

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
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