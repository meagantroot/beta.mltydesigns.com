// Player Turn Control

function handleTurn(action) {
    const mode = gameState.mode;

    // // Save a deep copy of current state before modifying it
    // // We slice the history to prevent it from growing infinitely (e.g., last 20 moves)
    // const stateCopy = JSON.parse(JSON.stringify(gameState));
    // delete stateCopy.history; // Don't nest history inside itself
    // gameState.history.push(stateCopy);
    // if (gameState.history.length > 20) gameState.history.shift();
    
    saveHistory();

    // Delegate to specific logic handlers
    if (mode === '8-ball') {
        handle8Ball(action);
    } else if (mode === '9-ball') {
        handle9Ball(action);
    } else if (mode === '10-ball') {
        handle10Ball(action);
    }

    saveGame();
}

function getActiveBallCount() {
    return gameState.table.filter(b => b.state === 'killed').length;
}

function getPocketedBallCount() {
    return gameState.table.filter(b => b.state === 'selected').length;
}

// 8-Ball Logic

function handle8Ball(action) {
    const { p, opponent, pocketed, madeMoneyBall } = getTurnContext();
    
    // A 'Break Shot' is defined as a shot where NO balls have been moved to 'dead' yet in the current rack.
    // const isBreakShot = gameState.table.every(b => b.state !== 'dead');

    // Safely check shot count, defaulting to 0 if undefined for any reason
    const currentShot = gameState.rackShotCount || 0;
    const isBreakShot = (currentShot === 0);

    // const is8Break = (madeMoneyBall && action !== 'scratch' && isBreakShot);

    const containsEight = pocketed.includes(8);
    const is8Break = (containsEight && action !== 'scratch' && isBreakShot);
    const isBnR = (action === 'breakAndRun' && isBreakShot);
    
    let resetRack = false;
    let earlyLoss = false;
    let pts = 0;

if (is8Break || isBnR) {
    p.racksWon++;
    pts = 1; // 8-ball is scored by racks
    p.count8onbreak += is8Break ? 1 : 0;
    p.breakandruns += isBnR ? 1 : 0;
    resetRack = true;
    // alert(is8Break ? "💥 8-on-the-Break!" : "🚀 Break and Run!");

    const awardCanvasElement = document.getElementById('awardOffcanvas');
    const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(awardCanvasElement);
    bsOffcanvas.show();
    
    if(is8Break) {
        award(0,'8 on the Break!');
    } else {
        award(0,'Break and Run!');      
    }
} 
else if (action === 'breakAndRun' && !isBreakShot) {
    // Optional: Alert the user if they try to BnR after the break
    alert("Break and Run can only be claimed on the opening shot.");
    return; 
}
else {
    // Group Assignment Logic
    if (pocketed.length > 0 && !p.group && action !== 'scratch') {
        assign8BallGroups(pocketed, p, opponent);
    }

    // Check win/loss conditions if the 8-ball was involved
    const ballsRemaining = getRemainingGroupBalls(p);
    const isOn8Ball = (p.group && ballsRemaining === 0);

    if (madeMoneyBall) {
        if (isOn8Ball && action !== 'scratch') {
            // Legal Win: Pocketed the 8 as the last ball
            p.racksWon++;
            pts = 1;
            resetRack = true;
        } else {
            // Illegal 8: Either early pocket or scratched on the 8
            earlyLoss = true;
        }
    } else if (action === 'scratch' && isOn8Ball) {
        // Foul while shooting at the 8-ball is a Loss of Game
        earlyLoss = true;
    }
}

    // Increment the counter so subsequent shots in this rack aren't "Snaps"
    gameState.rackShotCount++;

    // Finalize stats and move to the next turn
    finalizeTurn(action, pts, resetRack, earlyLoss, (action === 'breakAndRun'), is8Break);

}

// 8-Ball Helpers

function assign8BallGroups(selected, p, opponent) {
    let solidsCount = 0;
    let stripesCount = 0;

    for (let id of selected) {
        if (id >= 1 && id <= 7) solidsCount++;
        if (id >= 9 && id <= 15) stripesCount++;
    }

    // Only assign if one count is strictly higher than the other
    if (solidsCount > stripesCount) {
        p.group = 'Solids';
        opponent.group = 'Stripes';
        alert(`${p.name} pocketed more solids and is now Solids!`);
    } else if (stripesCount > solidsCount) {
        p.group = 'Stripes';
        opponent.group = 'Solids';
        alert(`${p.name} pocketed more stripes and is now Stripes!`);
    } else {
        // It's a tie (e.g., 1 solid and 1 stripe) or nothing was pocketed
        // Groups remain undefined/open
    }
}

function getRemainingGroupBalls(player) {
    if (!player.group) return -1; // Group not yet assigned

    return gameState.table.filter(b => {
        if (player.group === 'Solids') return b.id >= 1 && b.id <= 7 && b.state === 'active';
        if (player.group === 'Stripes') return b.id >= 9 && b.id <= 15 && b.state === 'active';
        return false;
    }).length;
}


// 9-Ball Logic

function handle9Ball(action) {
    const { p, rules, pocketed, madeMoneyBall } = getTurnContext();
    const isSingleGame = document.getElementById('gameStyleSingle').checked;
    
    // Safely check shot count, defaulting to 0 if undefined for any reason
    const currentShot = gameState.rackShotCount || 0;
    const isBreakShot = (currentShot === 0);
    
    const containsNine = pocketed.includes(9);
    const isSnap = (containsNine && action !== 'scratch' && isBreakShot);
    
    // Strictly trigger Break and Run ONLY if it's the break shot
    const isBnR = (action === 'breakAndRun' && isBreakShot);

    let resetRack = false;
    let pts = 0;

    if (isSnap || isBnR) {
        p.racksWon++;
        p.count9onsnap += isSnap ? 1 : 0;
        p.breakandruns += isBnR ? 1 : 0;
        
        if (isSnap) {
            // Include value of all pocketed balls + 2 bonus points
            // pts = calculatePoints(pocketed, rules);
            
            if (isSingleGame) {
                respotBall(9);
                alert("9-ball spotted. Continue Shooting.");
            } else {
                pts = calculatePoints(pocketed, rules);
            }

            // alert("🚀 9-on-the-Snap!");
            const awardCanvasElement = document.getElementById('awardOffcanvas');
            const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(awardCanvasElement);
            bsOffcanvas.show();
            award(0,'9 on the Snap!');
        } else {
            pts = 10; // APA Break & Run
            // alert("💥 Break and Run!");
            const awardCanvasElement = document.getElementById('awardOffcanvas');
            const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(awardCanvasElement);
            bsOffcanvas.show();
            award(0,'Break and Run!');
        }
        resetRack = true;
    } 
    else if (madeMoneyBall && action === 'scratch') {
        respotBall(9);
        alert("9-ball spotted. Turnover.");
        pts = calculatePoints(pocketed.filter(id => id !== 9), rules);
    } 
    else if (madeMoneyBall) {
        p.racksWon++;
        
        if (isSingleGame) {
            pts = p.target; 
        } else {
            pts = calculatePoints(pocketed, rules);
        }
        
        resetRack = true;
    }
    else {
        
        if (isSingleGame) {
            pts = 0; 
        } else {
            pts = calculatePoints(pocketed, rules);
        }
    }

    // Increment the counter so subsequent shots in this rack aren't "Snaps"
    gameState.rackShotCount++;

    finalizeTurn(action, pts, resetRack, false, isBnR, isSnap);
}


// Calculate 9-ball Points

function calculatePoints(pocketed, rules) {
    // If rules.ballValue is a function, use it; 
    // otherwise, default to 1 point per ball (common in some 9-ball formats)
    return pocketed.reduce((total, ballId) => {
        const val = (typeof rules.ballValue === 'function') 
            ? rules.ballValue(ballId) 
            : 1;
        return total + val;
    }, 0);
}


// 10-Ball Logic

function handle10Ball(action) {
    const { p, rules, pocketed, madeMoneyBall } = getTurnContext();
    const isBreakShot = (gameState.rackShotCount === 0);
    
    let resetRack = false;
    let pts = 0;

    if (action === 'breakAndRun' && isBreakShot) {
        p.racksWon++;
        pts = 1; // This adds the 1 point
            const awardCanvasElement = document.getElementById('awardOffcanvas');
            const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(awardCanvasElement);
            bsOffcanvas.show();
            award(0,'Break and Run!');
        resetRack = true; // This triggers the rack reset in finalizeTurn
    } 

    // In 10-ball, if the 10 is made early or on a scratch, it is spotted
    if (madeMoneyBall) {
        const isLegalWin = (action !== 'scratch' && getActiveBallCount() === 9 || getPocketedBallCount() + getActiveBallCount() === 10 );
        
        if (isLegalWin) {
            p.racksWon++;
            pts += 1;
            resetRack = true;
        } else {
            respotBall(10);
            alert("10-ball spotted (Early or Scratch).");
        }
    }

    gameState.rackShotCount++;
    finalizeTurn(action, pts, resetRack);
    // console.log("Full Game State:", gameState);
}

// Shared Helpers

function getTurnContext() {
    const rules = GAME_RULES[gameState.mode];
    return {
        p: gameState.players[gameState.currentTurn],
        opponent: gameState.players[gameState.currentTurn === 0 ? 1 : 0],
        rules: rules,
        pocketed: gameState.table.filter(b => b.state === 'selected').map(b => b.id),
        madeMoneyBall: gameState.table.some(b => b.id === rules.moneyBall && b.state === 'selected')
    };
}

// Finalize Turn Data

function finalizeTurn(action, pts, resetRack, earlyLoss = false, isBR = false, isSnap = false) {
    const { p, opponent, pocketed } = getTurnContext();
    
    // Ensure global inning index exists
    if (gameState.currentInningIndex === undefined) gameState.currentInningIndex = 0;
    const currentIdx = gameState.currentInningIndex;

    // Initialize inning objects for both players to ensure table rows are synced
    if (!p.innings[currentIdx]) {
        p.innings[currentIdx] = { balls: [], points: 0, action: null };
    }
    if (!opponent.innings[currentIdx]) {
        opponent.innings[currentIdx] = { balls: [], points: 0, action: 'waiting' };
    }

    // Save Persistent Badges/Flags for this Inning
    // This allows the render function to show 'BR' or 'SNAP'
    p.innings[currentIdx].isBR = isBR || (action === 'breakAndRun');
    p.innings[currentIdx].isSnap = isSnap;

    // Handle Early Loss for 8-ball
    if (earlyLoss) {
        opponent.racksWon++;
        opponent.score += 1;
        resetRack = true;
        alert(`Loss of Game! Rack awarded to ${opponent.name}.`);
        p.innings[currentIdx].action = 'loss';
    }

    // Update stats and Inning Data for the active shooter
    p.score += pts;
    p.innings[currentIdx].balls.push(...pocketed);
    p.innings[currentIdx].points += pts;
    
    if (action === 'safety') { 
        p.defensiveShots++; 
        p.innings[currentIdx].action = 'safety'; 
    }
    if (action === 'scratch') { 
        p.scratches++; 
        p.innings[currentIdx].action = 'scratch'; 
    }

    // Manage Table State and Inning Transitions
    if (resetRack) {
        // Mark all pocketed balls as 'dead' before resetting the table for the next rack
        gameState.table.forEach(b => { if(b.state === 'pocketed') b.state = 'dead'; });
        
        resetTable(); // Resets balls/rackShotCount but KEEPS match innings
        
        // Advance the inning row immediately when a rack ends to keep logic clean
        gameState.currentInningIndex++;
        
        // If someone lost early, the opponent starts the next rack
        if (earlyLoss) switchTurn();
    } else {
        markBallsDead();
        markBallsPocketed();
        
        // Standard Inning logic: Inning row increments after the second player finishes
        if (gameState.currentTurn === 1) {
            gameState.currentInningIndex++;
        }
        switchTurn();
    }

    // Increment rack-specific shot count
        gameState.rackShotCount + 1;
    
    // Save to LocalStorage and update UI
    saveGame(); 
    render();

const winner = gameState.players.find(player => player.score >= player.target);

if (winner) {
        const offcanvasElement = document.getElementById('winnerOffcanvas');
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
        document.getElementById('winnerNameDisplay').innerText = "🎉 Winner: " + winner.name;
        bsOffcanvas.show();
        launchConfetti();
}


}

function playAgain() {
    resetGame();
}


function respotBall(id) {
    const ball = gameState.table.find(b => b.id === id);
    if (ball) ball.state = 'active';
}

function markBallsDead() {
    gameState.table.forEach(b => {
        if (b.state === 'killed') b.state = 'dead';
    });
}

function markBallsPocketed() {
    gameState.table.forEach(b => {
        if (b.state === 'selected') b.state = 'pocketed';
    });
}


function switchTurn() {
    gameState.currentTurn = (gameState.currentTurn === 0) ? 1 : 0;
}
