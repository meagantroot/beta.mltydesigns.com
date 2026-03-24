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

    // // Get the Skill inputs
    const p1SkillInput = document.getElementById('p1Skill');
    const p2SkillInput = document.getElementById('p2Skill');

    // Get the Name inputs
    const p1NameInput = document.getElementById('p1Name');
    const p2NameInput = document.getElementById('p2Name');

    // Check HTML5 validity (patterns, required, etc.)
    if (!p1NameInput.checkValidity() || !p2NameInput.checkValidity()) {
        p1NameInput.reportValidity() || p2NameInput.reportValidity();
        return;
    }

    // Use DOMPurify to clean the strings
    const p1Name = DOMPurify.sanitize(p1NameInput.value);
    const p2Name = DOMPurify.sanitize(p2NameInput.value);

    // ONLY letters and numbers (no symbols at all)
    const p1Clean = p1Name.replace(/[^a-z0-9 ]/gi, '');
    const p2Clean = p2Name.replace(/[^a-z0-9 ]/gi, '');

    // Now use p1Clean and p2Clean in your app
    console.log("Safe Names:", p1Clean, p2Clean);

    // alpha only DomPurify
    const clean = (str) => {
        // Strip everything except letters, numbers, and spaces
        const alphaOnly = str.replace(/[^a-z0-9 ]/gi, "");
        // Sanitize just to be 100% safe from XSS
        return DOMPurify.sanitize(alphaOnly);
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
            target: isSingleGame ? 1 : (WIN_CHARTS[mode][p2S] && WIN_CHARTS[mode][p2S][p1S]) || (WIN_CHARTS[mode][p1S]),
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
            target: isSingleGame ? 1 : (WIN_CHARTS[mode][p1S] && WIN_CHARTS[mode][p1S][p2S]) || (WIN_CHARTS[mode][p2S]),
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
