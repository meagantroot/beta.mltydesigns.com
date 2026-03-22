// This function starts the game

document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
}, { passive: false });


let gameState = null;

// Ensure gameState exists before setting properties
if (!gameState) {
    gameState = {}; 
}

// Set Theme Default
if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light');
}

// Setup Game Counters
gameState.currentInningIndex = 0;
gameState.rackShotCount = 0;

window.onload = function() { loadGame(); displayHistory(); updateLifetimeStats(); updateStorageMeter(); };


// Start Game

function startGame() {

    // Get the Name inputs
    const p1NameInput = document.getElementById('p1Name');
    const p2NameInput = document.getElementById('p2Name');

    // Get the Skill inputs
    const p1SkillInput = document.getElementById('p1Skill');
    const p2SkillInput = document.getElementById('p2Skill');

    // Check validity
    if (!p1NameInput.checkValidity() || !p2NameInput.checkValidity()) {
        p1NameInput.reportValidity() || p2NameInput.reportValidity();
        return;
    }

    const clean = (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerText;
    };


    const mode = document.querySelector('input[name="gameMode"]:checked').value;
    const p1S = parseInt(p1SkillInput.value);
    const p2S = parseInt(p2SkillInput.value);

    if ( clean(p1NameInput.value) === "" || clean(p2NameInput.value) === "") { alert("Please Enter a Player Name"); location.reload(); exit; }

    // Skill 1-3 = 2 timeouts, 4+ = 1 timeout
    const getInitialTimeouts = (skill) => (skill <= 3 ? 2 : 1);
    
    const isSingleGame = document.getElementById('gameStyleSingle').checked;

gameState = {
    mode: mode,
    currentTurn: 0,
    rackShotCount: 0,
    history: [],
    table: Array.from({length: 15}, (_, i) => ({ id: i + 1, state: 'active' })),
    players: [
        { 
            name: clean(p1NameInput.value), 
            skill: p1S, 
            // Player 1's target is found by Row (Opponent Skill) and Column (Own Skill)
            target: isSingleGame ? 1 : (WIN_CHARTS[mode][p2S] && WIN_CHARTS[mode][p2S][p1S]) || (WIN_CHARTS[mode][p1S]) || 10, 
            score: 0, 
            racksWon: 0, 
            defensiveShots: 0, 
            scratches: 0,
            count9onsnap: 0,
            count8onbreak: 0,
            breakandruns: 0,
            errors: 0,
            timeouts: getInitialTimeouts(p1S),
            innings: [], 
            group: null 
        },
        { 
            name: clean(p2NameInput.value), 
            skill: p2S, 
            // Player 2's target uses Player 1's skill as the row lookup
            target: isSingleGame ? 1 : (WIN_CHARTS[mode][p1S] && WIN_CHARTS[mode][p1S][p2S]) || (WIN_CHARTS[mode][p2S]) || 10, 
            score: 0, 
            racksWon: 0, 
            defensiveShots: 0, 
            scratches: 0,
            count9onsnap: 0,
            count8onbreak: 0,
            breakandruns: 0,
            errors: 0,
            timeouts: getInitialTimeouts(p2S),
            innings: [], 
            group: null 
        }
    ]
};

    saveGame(); 
    showGameUI();
}