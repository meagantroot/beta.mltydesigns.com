// Save Game on Win

function saveGame() {
    localStorage.setItem('pool_score_data', JSON.stringify(gameState));
    render(); updateStorageMeter(); updateLifetimeStats();displayHistory();
}

// Archive Game
function archiveMatch() {
    const history = JSON.parse(localStorage.getItem('pool_match_history') || '[]');
    history.unshift({
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: gameState.mode,
        players: gameState.players.map(p => ({ 
            name: p.name, 
            score: p.score, 
            target: p.target, 
            scratches: p.scratches, 
            rate: (p.scratches / (p.innings.length || 1) * 100).toFixed(1), 
            won: p.score >= p.target, 
            count8onbreak: p.count8onbreak, 
            count9onsnap: p.count9onsnap, 
            breakandrun: p.breakandruns 
        }))
    });
    localStorage.setItem('pool_match_history', JSON.stringify(history.slice(0, 50)));
}

function resetGame() {

    const winner = gameState.players.find(player => player.score >= player.target);

    if (winner) {
        archiveMatch();
        updateLifetimeStats();
        displayHistory();
        updateStorageMeter();
    }
    
    // Hide the game board, show the player entry form
    document.getElementById('game-ui').style.display = 'none';
    document.getElementById('setup-form').style.display = 'block';
    
    // Clear the localStorage so a fresh game doesn't load the old one
    localStorage.removeItem('pool_score_data');
    
    // Reset any local variables if necessary
    gameState = null; 
}

// This creates a copy so the history doesn't change when the current gameState changes later.

function saveHistory() {
    
    const stateCopy = JSON.parse(JSON.stringify(gameState));
    delete stateCopy.history; 
    gameState.history.push(stateCopy);
    if (gameState.history.length > 20) gameState.history.shift();
}