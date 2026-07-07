// Game Hub Main Script
let currentFilter = 'all';
let filteredGames = [...GAMES_DATABASE];

// Hide loading screen after animation
setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.display = 'none';
}, 2500);

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    renderGames(GAMES_DATABASE);
});

// Event Listeners
function initializeEventListeners() {
    const searchBar = document.getElementById('searchBar');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('gameModal');
    const closeBtn = document.querySelector('.modal-close');

    // Search functionality
    searchBar.addEventListener('input', handleSearch);
    searchBar.addEventListener('focus', showSearchSuggestions);
    searchBar.addEventListener('blur', () => {
        setTimeout(() => {
            const suggestions = document.getElementById('searchSuggestions');
            suggestions.classList.remove('active');
        }, 200);
    });

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            filterGames();
        });
    });

    // Modal close
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// Search Handler
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    
    if (query.length === 0) {
        filterGames();
        return;
    }

    filteredGames = GAMES_DATABASE.filter(game => 
        game.title.toLowerCase().includes(query) ||
        game.genre.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query) ||
        game.tags.some(tag => tag.includes(query))
    );

    renderGames(filteredGames);
}

// Show search suggestions
function showSearchSuggestions() {
    const searchBar = document.getElementById('searchBar');
    const query = searchBar.value.toLowerCase();
    const suggestions = document.getElementById('searchSuggestions');

    if (query.length === 0) return;

    const matchedGames = GAMES_DATABASE.filter(game =>
        game.title.toLowerCase().includes(query) ||
        game.tags.some(tag => tag.includes(query))
    ).slice(0, 5);

    if (matchedGames.length === 0) return;

    suggestions.innerHTML = matchedGames.map(game => 
        `<div class="suggestion-item" onclick="selectSuggestion('${game.title}')">${game.emoji} ${game.title}</div>`
    ).join('');

    suggestions.classList.add('active');
}

// Select suggestion
function selectSuggestion(title) {
    const searchBar = document.getElementById('searchBar');
    searchBar.value = title;
    handleSearch({ target: searchBar });
    document.getElementById('searchSuggestions').classList.remove('active');
}

// Filter games
function filterGames() {
    if (currentFilter === 'all') {
        filteredGames = [...GAMES_DATABASE];
    } else {
        filteredGames = GAMES_DATABASE.filter(game => game.genre === currentFilter);
    }
    renderGames(filteredGames);
}

// Render games to the grid
function renderGames(games) {
    const gamesGrid = document.getElementById('gamesGrid');
    
    if (games.length === 0) {
        gamesGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">No games found. Try a different search or filter.</div>';
        return;
    }

    gamesGrid.innerHTML = games.map(game => `
        <div class="game-card" onclick="openGame(${game.id})">
            <div class="game-thumbnail">${game.emoji}</div>
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <span class="game-genre">${capitalizeFirst(game.genre)}</span>
                <p class="game-description">${game.description}</p>
                <button class="play-btn-card">Play Now</button>
            </div>
        </div>
    `).join('');
}

// Open game in modal
function openGame(gameId) {
    const game = GAMES_DATABASE.find(g => g.id === gameId);
    
    if (!game) return;

    const modal = document.getElementById('gameModal');
    const gameEmbed = document.getElementById('gameEmbed');
    const modalTitle = document.getElementById('modalGameTitle');
    const modalDescription = document.getElementById('modalGameDescription');
    const playBtn = document.getElementById('playBtn');

    modalTitle.textContent = `${game.emoji} ${game.title}`;
    modalDescription.textContent = game.description;
    gameEmbed.innerHTML = `<iframe src="${game.url}" allow="fullscreen; autoplay" loading="lazy"><\/iframe>`;
    
    playBtn.onclick = () => {
        window.open(game.url, '_blank');
    };

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('gameModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Utility function
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press '/' to focus search
    if (e.key === '/') {
        e.preventDefault();
        document.getElementById('searchBar').focus();
    }
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth' });
    });
});
