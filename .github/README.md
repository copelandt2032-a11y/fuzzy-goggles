# Fuzzy Goggles - Game Proxy Hub 🎮

A feature-rich gaming proxy platform with an extensive game library, embedded search functionality, custom loading screen, and links to multiple proxy services.

## Features

✨ **20+ Popular Games** - 2048, Pac-Man, Tetris, Chess, Wordle, and more
🔍 **Advanced Search** - Real-time game search with suggestions
🎯 **Smart Filtering** - Filter games by Action, Puzzle, Strategy, and Sports
🎨 **Custom Loading Screen** - Eye-catching animated loading experience
🌈 **Modern UI** - Dark theme with gradient effects and smooth animations
📱 **Responsive Design** - Fully optimized for mobile and desktop
🔗 **Proxy Links** - Quick access to 6+ other proxy services
⚡ **Low Latency** - Optimized for fast game loading
🎪 **Game Modal** - Play games in a full-screen modal
🔌 **RESTful API** - Complete API for games, search, and filters

## Quick Start

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/copelandt2032-a11y/fuzzy-goggles.git
cd fuzzy-goggles

# Install dependencies
npm install
```

### Configuration

Create a `.env` file:

```env
PORT=3000
LOG_LEVEL=info
CUSTOM_TITLE=Fuzzy Goggles - Game Proxy Hub
```

### Running the Game Hub

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Visit `http://localhost:3000` in your browser

## API Endpoints

### Get All Games
```
GET /api/games
```
Returns all available games with metadata.

### Search Games
```
GET /api/games/search?q=query
```
Search games by title, genre, or tags.

Example:
```
GET /api/games/search?q=puzzle
```

### Filter by Genre
```
GET /api/games/genre/:genre
```
Get games filtered by specific genre (action, puzzle, strategy, sports).

Example:
```
GET /api/games/genre/puzzle
```

### Health Check
```
GET /api/health
```
Returns server health status.

## Available Games

### Action Games 🎯
- Flappy Bird
- Pac-Man
- Snake Game
- Breakout
- Dino Runner

### Puzzle Games 🧩
- 2048
- Tetris
- Wordle
- Memory Game
- Hangman
- Sudoku
- Crossword
- Minesweeper

### Strategy Games 🧠
- Chess
- Tic Tac Toe
- Connect Four
- Checkers

### Sports Games ⚽
- Pong
- Soccer Shootout
- Basketball

## Other Proxy Services

Quick links to complementary proxy services:
- Node Unblocker
- ProxySite
- Hide.me VPN
- VPNBook
- FreeVPN
- Hidester

## Project Structure

```
fuzzy-goggles/
├── public/
│   ├── index.html          # Main HTML
│   ├── styles.css          # Styling
│   ├── script.js           # Frontend logic
│   └── games-data.js       # Game database
├── src/
│   ├── index.js            # Server entry point
│   └── games-list.js       # Server-side games list
├── package.json
├── .env.example
└── README.md
```

## Features in Detail

### 🔍 Smart Search
- Real-time search as you type
- Search suggestions
- Filter by game title, genre, and tags
- Keyboard shortcut: press `/` to focus search

### 🎨 Custom Loading Screen
- Animated spinner
- Progress bar
- Gradient text effects
- Auto-hides after 2.5 seconds

### 🎪 Game Modal
- Embedded game iframe
- Full-screen play option
- Close with ESC key
- Smooth animations

### 📊 Filtering System
- All Games
- Action
- Puzzle
- Strategy
- Sports

### 📱 Responsive Design
- Desktop optimized
- Tablet friendly
- Mobile responsive
- Touch-friendly buttons

## Keyboard Shortcuts

- `/` - Focus search bar
- `ESC` - Close modal/dialog

## Performance

- **Initial Load**: < 2 seconds
- **Search Response**: < 100ms
- **Game Load**: Varies by game (1-5 seconds)
- **Optimized Assets**: Minified CSS and JavaScript

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Building for Production
```bash
npm run build
```

## Configuration Options

Edit `.env` to customize:

```env
PORT=3000                           # Server port
LOG_LEVEL=info                      # Logging level
CUSTOM_TITLE=Your Title            # Custom title
MAX_GAMES=100                      # Maximum games to display
ENABLE_SEARCH=true                 # Enable search feature
ENABLE_FILTERS=true                # Enable filter buttons
```

## Troubleshooting

### Games Won't Load
- Check your internet connection
- Clear browser cache
- Try a different game
- Check browser console for errors

### Search Not Working
- Ensure JavaScript is enabled
- Check browser console
- Try refreshing the page

### Performance Issues
- Close other tabs/applications
- Clear browser cache
- Update your browser
- Check your internet speed

## Security Notes

⚠️ This is a proxy hub for casual gaming. For serious applications:
- Implement authentication
- Add rate limiting
- Use HTTPS in production
- Sanitize all inputs
- Monitor server resources

## Contributing

Contributions are welcome! To add new games:

1. Add game entry to `public/games-data.js`
2. Add game entry to `src/games-list.js`
3. Ensure proper metadata (title, genre, emoji, etc.)
4. Test functionality
5. Submit a pull request

### Game Entry Format
```javascript
{
    id: 21,
    title: "Game Name",
    genre: "action/puzzle/strategy/sports",
    emoji: "🎮",
    description: "Short description",
    url: "https://game-url.com",
    tags: ["tag1", "tag2"],
    popularity: 8.5,
    difficulty: "Easy/Medium/Hard"
}
```

## License

MIT License - See LICENSE file for details

## Support

For issues and feature requests, visit the [GitHub Issues](https://github.com/copelandt2032-a11y/fuzzy-goggles/issues)

## Disclaimer

This project is for educational and entertainment purposes. Always respect game copyrights and terms of service.

---

**Made with ❤️ for gamers everywhere** 🎮✨
