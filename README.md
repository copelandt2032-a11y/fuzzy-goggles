# Fuzzy Goggles - Gaming Proxy

A lightweight gaming proxy for routing and optimizing game server connections with latency reduction, traffic shaping, and regional optimization.

## Features

- **Low-latency connection routing** - Intelligent routing to nearby game servers
- **Traffic optimization** - Packet compression and prioritization
- **Regional failover** - Automatic fallback to alternative regions
- **Connection pooling** - Reuse connections for better performance
- **Logging and monitoring** - Track connection metrics and performance

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file:

```env
PORT=3000
GAME_SERVERS=server1.example.com:7777,server2.example.com:7777
LOG_LEVEL=info
```

### Running the Proxy

```bash
npm start
```

The proxy will start on `http://localhost:3000`

## Architecture

- `src/proxy.js` - Main proxy server
- `src/router.js` - Intelligent routing logic
- `src/optimizer.js` - Traffic optimization
- `config/` - Configuration files