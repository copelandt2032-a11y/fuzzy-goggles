// Game database with embedded game URLs
const GAMES_DATABASE = [
    {
        id: 1,
        title: "2048",
        genre: "puzzle",
        emoji: "🔢",
        description: "Slide tiles to combine numbers and reach 2048!",
        url: "https://gabrielecirulli.github.io/2048/",
        tags: ["puzzle", "numbers", "sliding"]
    },
    {
        id: 2,
        title: "Flappy Bird",
        genre: "action",
        emoji: "🐦",
        description: "Help the bird avoid the pipes in this classic game",
        url: "https://playcanvas.com/project/418549/overview",
        tags: ["action", "arcade", "reflexes"]
    },
    {
        id: 3,
        title: "Pac-Man",
        genre: "action",
        emoji: "👾",
        description: "Classic arcade game - eat dots and avoid ghosts",
        url: "https://www.webpacman.com/",
        tags: ["action", "arcade", "classic"]
    },
    {
        id: 4,
        title: "Tetris",
        genre: "puzzle",
        emoji: "⬜",
        description: "Stack falling blocks to complete lines",
        url: "https://tetris.com/play-tetris",
        tags: ["puzzle", "blocks", "strategy"]
    },
    {
        id: 5,
        title: "Snake Game",
        genre: "action",
        emoji: "🐍",
        description: "Grow your snake by eating food while avoiding walls",
        url: "https://playsnakegame.org/",
        tags: ["action", "arcade", "simple"]
    },
    {
        id: 6,
        title: "Chess",
        genre: "strategy",
        emoji: "♟️",
        description: "Play chess against AI or other players",
        url: "https://www.chess.com/play/online",
        tags: ["strategy", "board", "brain"]
    },
    {
        id: 7,
        title: "Tic Tac Toe",
        genre: "strategy",
        emoji: "❌",
        description: "Classic strategy game - get three in a row",
        url: "https://playgroundai.com/tictactoe",
        tags: ["strategy", "simple", "quick"]
    },
    {
        id: 8,
        title: "Pong",
        genre: "sports",
        emoji: "🏓",
        description: "Classic paddle game - bounce the ball back and forth",
        url: "https://pong-js.firebaseapp.com/",
        tags: ["sports", "arcade", "classic"]
    },
    {
        id: 9,
        title: "Wordle",
        genre: "puzzle",
        emoji: "📝",
        description: "Guess the word in six attempts",
        url: "https://www.nytimes.com/games/wordle/index.html",
        tags: ["puzzle", "word", "daily"]
    },
    {
        id: 10,
        title: "Breakout",
        genre: "action",
        emoji: "🧱",
        description: "Break bricks with a bouncing ball",
        url: "https://www.breakoutgame.online/",
        tags: ["action", "arcade", "brick"]
    },
    {
        id: 11,
        title: "Memory Game",
        genre: "puzzle",
        emoji: "🧠",
        description: "Match pairs of cards to test your memory",
        url: "https://www.memozor.com/",
        tags: ["puzzle", "memory", "brain"]
    },
    {
        id: 12,
        title: "Hangman",
        genre: "puzzle",
        emoji: "📖",
        description: "Guess the word before running out of tries",
        url: "https://www.hangmanwordgame.com/",
        tags: ["puzzle", "word", "guessing"]
    },
    {
        id: 13,
        title: "Soccer Shootout",
        genre: "sports",
        emoji: "⚽",
        description: "Score goals in this soccer penalty shootout",
        url: "https://www.soccershootout.me/",
        tags: ["sports", "shooting", "fast"]
    },
    {
        id: 14,
        title: "Basketball",
        genre: "sports",
        emoji: "🏀",
        description: "Shoot hoops and score as many baskets as you can",
        url: "https://www.basketballlegend.com/",
        tags: ["sports", "shooting", "arcade"]
    },
    {
        id: 15,
        title: "Connect Four",
        genre: "strategy",
        emoji: "🔴",
        description: "Get four in a row vertically, horizontally, or diagonally",
        url: "https://www.mathsisfun.com/games/connect4.html",
        tags: ["strategy", "board", "game"]
    },
    {
        id: 16,
        title: "Sudoku",
        genre: "puzzle",
        emoji: "🔠",
        description: "Solve number puzzles and complete the grid",
        url: "https://sudoku.com/",
        tags: ["puzzle", "numbers", "brain"]
    },
    {
        id: 17,
        title: "Crossword",
        genre: "puzzle",
        emoji: "✏️",
        description: "Solve crossword puzzles and expand your vocabulary",
        url: "https://www.crosswordsolver.com/",
        tags: ["puzzle", "word", "daily"]
    },
    {
        id: 18,
        title: "Minesweeper",
        genre: "puzzle",
        emoji: "💣",
        description: "Uncover tiles without hitting the mines",
        url: "https://www.minesweeper.online/",
        tags: ["puzzle", "strategy", "classic"]
    },
    {
        id: 19,
        title: "Checkers",
        genre: "strategy",
        emoji: "🎯",
        description: "Play checkers against the computer",
        url: "https://www.gamesforthebrain.com/game/checkers/",
        tags: ["strategy", "board", "classic"]
    },
    {
        id: 20,
        title: "Dino Runner",
        genre: "action",
        emoji: "🦖",
        description: "Run as the T-Rex and avoid obstacles",
        url: "https://chromedino.com/",
        tags: ["action", "arcade", "endless"]
    }
];