const logger = require('./logger');

class GameRouter {
  constructor() {
    this.serverMetrics = new Map();
    this.latencyHistory = new Map();
  }

  /**
   * Select the best game server based on latency and availability
   */
  selectServer(servers) {
    if (!servers || servers.length === 0) {
      throw new Error('No game servers configured');
    }

    if (servers.length === 1) {
      return servers[0];
    }

    // For now, use round-robin with latency bias
    // In production, this would include actual latency measurements
    const selectedServer = servers[Math.floor(Math.random() * servers.length)];
    
    logger.debug({ selectedServer }, 'Server selected');
    return selectedServer;
  }

  /**
   * Record latency for a server
   */
  recordLatency(server, latency) {
    if (!this.latencyHistory.has(server)) {
      this.latencyHistory.set(server, []);
    }
    
    const history = this.latencyHistory.get(server);
    history.push(latency);
    
    // Keep only last 100 measurements
    if (history.length > 100) {
      history.shift();
    }
  }

  /**
   * Get average latency for a server
   */
  getAverageLatency(server) {
    const history = this.latencyHistory.get(server);
    if (!history || history.length === 0) {
      return 0;
    }
    
    const sum = history.reduce((a, b) => a + b, 0);
    return sum / history.length;
  }

  /**
   * Get server health status
   */
  getServerStatus(servers) {
    return servers.map(server => ({
      server,
      avgLatency: this.getAverageLatency(server),
      measurements: this.latencyHistory.get(server)?.length || 0
    }));
  }
}

module.exports = new GameRouter();