// Toogle Ball States

function toggleBall(id) {
    const b = gameState.table.find(x => x.id === id);
    
    // Define the cycle  
    if (gameState.mode == '9-ball' && b.id === 9 || gameState.mode == '8-ball' && b.id === 8 ) { 
    const states = ['active', 'pocketed'];
    let currentIndex = states.indexOf(b.state);
    
    // Move to next state
    b.state = states[(currentIndex + 1) % 2];
    render();

    } else {
        const states = ['active', 'pocketed', 'dead'];
        let currentIndex = states.indexOf(b.state);

    // Move to next state
    b.state = states[(currentIndex + 1) % 3];
    render();
    }
}