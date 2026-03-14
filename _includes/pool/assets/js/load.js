// Load Game

function loadGame() {


    const saved = localStorage.getItem('pool_score_data');
    if (saved) {
        gameState = JSON.parse(saved);
        if (!gameState.table) gameState.table = Array.from({ length: 15 }, (_, i) => ({
            id: i + 1, state: 'active'
        }));
        showGameUI();
    }
}

// Render Game UI

function render() {

    const container = document.getElementById('player-container');
    if (!gameState || !container) return;

    const p1 = gameState.players[0];
    const p2 = gameState.players[1];
    const active = gameState.players[gameState.currentTurn];
    const rules = GAME_RULES[gameState.mode];

    const ballGrid = `
    <div class="row row-cols-5 g-1"> 
        ${gameState.table.slice(0, rules.maxBalls).map(b => `
            <div class="col">
                <div class="ball ${b.state}" onclick="toggleBall(${b.id})" data-id="${b.id}">
                    ${b.id}
                </div>
            </div>
        `).join('')}
    </div>`;

    container.innerHTML = `
    <div class="card">
        <!-- Scoreboard Header -->
        <div class="card-body" style="display:flex; justify-content:space-between; padding:15px; background:var(--bg-body); border-bottom:1px solid #ddd;">
            <div style="flex:1; ${gameState.currentTurn === 0 ? 'color:var(--bs-success); font-weight:bold' : ''}">
                <div style="font-size:1.2em;">${p1.name} ${p1.group ? `(${p1.group})` : ''}</div>
                <div>${p1.score}/${p1.target} pts</div>
            </div>
            <div style="flex:1.0; align-self:center; text-align: center; font-weight:bold;">
                <h3 style="margin:0;"><small>Shooting:</small><br/>
                <strong><span style="color:var(--bs-success)">${active.name}</span></strong></h3>
            </div>
            <div style="text-align:right; flex:1; ${gameState.currentTurn === 1 ? 'color:var(--bs-success); font-weight:bold' : ''}">
                <div style="font-size:1.2em;">${p2.name} ${p2.group ? `(${p2.group})` : ''}</div>
                <div>${p2.score}/${p2.target} pts</div>
            </div>
        </div>

        <!-- Table Controls -->
        <div style="padding:4px; text-align:center; max-width:390px; margin-left:auto; margin-right:auto;">
            ${ballGrid}
            <div class="controls mt-3">
                <button class="btn btn-outline-primary" onclick="undoInning()">Undo</button>
                <button class="btn btn-info" onclick="handleTurn('breakAndRun')" ${(gameState.rackShotCount > 0) ? 'disabled' : ''}>Break & Run</button>
                <button class="btn btn-danger" onclick="handleTurn('scratch')">Scratch</button>
                <button class="btn btn-warning" onclick="handleTurn('safety')">Safety</button>
            </div>
            <div class="mt-3">
                <button class="btn btn-outline-danger w-50" onclick="resetGame()">Quit Match</button>
                <button class="btn btn-success w-100" onclick="handleTurn('score')">Next Turn</button>
            </div>
        </div>
    </div>

    <!-- Synchronized Inning Tables -->
    <div class="row mt-1 g-xl-2">
        ${gameState.players.map((p, i) => {
            let rows = "";
            const isDisabled = p.timeouts <= 0 ? 'disabled' : '';
            // Ensure we at least show the first row even if index is 0
            const displayLimit = Math.max(gameState.currentInningIndex || 0, p.innings.length - 1);

            for (let idx = 0; idx <= displayLimit; idx++) {
                const inn = p.innings[idx] || { balls: [], points: 0, action: 'waiting' };
                
                // Style for specialized rows
                const isWaiting = inn.action === 'waiting';
                const rowStyle = isWaiting ? 'opacity:0.4;' : '';
                const bgStyle = inn.action === 'safety' ? 'background:#fff3cd;' : (inn.action === 'scratch' ? 'background:#f8d7da;' : '');

                // Logic for badges (Snap, BR, Defense, Scratch)
                const badges = `
                    ${inn.action === 'safety' ? '<span class="badge bg-warning text-dark">Safe</span>' : ''}
                    ${inn.action === 'scratch' ? '<span class="badge bg-danger">Foul</span>' : ''}
                    ${inn.isBR ? '<span class="badge bg-info">BR</span>' : ''}
                    ${inn.isSnap ? `${gameState.mode === '8-ball' ? '<span class="badge bg-primary">8ob</span>' : '<span class="badge bg-warning">9os</span>'}` : ''}
                `;

                rows += `
                <tr style="${rowStyle} ${bgStyle}">
                    <td class="text-muted">${idx + 1}</td>
                    <td>${inn.balls.join(', ') || '-'} ${badges}</td>
                    <td class="text-end fw-bold">${inn.points}</td>
                </tr>`;
            }

            return `
            <div class="col-sm-12 col-md-6 mb-1 mt-1">
                <div class="card border-${gameState.currentTurn === i ? 'success' : 'secondary'}">
                    <div class="card-body p-1">
                        <div class="d-flex justify-content-between align-items-center mb-0">
                            <h5 class="m-0">${p.name}</h5>
                            <button id="timeout-btn-${i}" class="btn btn-sm btn-outline-primary" data-bs-toggle="offcanvas" data-bs-target="#timeout-modal" onclick="useTimeout(${i})" ${isDisabled}>

                                Timeouts: ${p.timeouts}
                            </button>
                        </div>
                        <div class="m-0">
                            <small class="text-muted">Racks: ${p.racksWon} | Safeties: ${p.defensiveShots} | Scratches: ${p.scratches}</small>
                        </div>
                        <table class="table table-striped table-sm mb-0">
                            <thead>
                                <tr>
                                    <th style="width:40px;">Inning</th>
                                    <th>Balls</th>
                                    <th class="text-end">Pts</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>`;
        }).join('')}
    </div>`;
}


// Load Game UI

function showGameUI() {
    document.getElementById('setup-form').style.display = 'none'; document.getElementById('game-ui').style.display = 'block'; render();
}

// Reset Table

function resetTable() {
    // Reset balls and rack-specific counters only
    gameState.table.forEach(b => b.state = 'active');
    gameState.rackShotCount = 0;

    gameState.players.forEach(p => {
        p.group = null; // Clear 8-ball groups for new rack
        p.timeouts = (p.skill <= 3 ? 2 : 1);
    });

    saveGame();
    render();
}

// Celebrate!

    function launchConfetti() {
        // 1. More pieces
        const count = 500; 
        const colors = ['#ff4757', '#2ed573', '#1e90ff', '#ffa502', '#ced6e0', '#e84393', '#74b9ff'];
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Randomize shapes (rectangles vs squares)
            confetti.style.width = Math.random() * 8 + 5 + 'px';
            confetti.style.height = Math.random() * 8 + 5 + 'px';

            const startX = window.innerWidth / 2;
            const startY = 0;
            
            // Wider spread and a downward "gravity" trajectory
            const destX = (Math.random() - 0.5) * 1500;
            const destY = (Math.random() * 900); // Drifts mostly downward
            const rotation = Math.random() * 1000; // More spins

            confetti.style.left = startX + 'px';
            confetti.style.top = startY + 'px';

            document.body.appendChild(confetti);

            // 2. Longer duration (3-5 seconds)
            const duration = 3000 + Math.random() * 2000;

            const animation = confetti.animate([
                { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
                { transform: `translate(${destX}px, ${destY}px) rotate(${rotation}deg)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.1, 1, 0.3, 1)', // Snappy start, very slow finish
                fill: 'forwards'
            });

            animation.onfinish = () => confetti.remove();
        }
    }


    // Rainbows

    // function launchRainbows() {
    // const count = 400; // Slightly fewer pieces since they are much larger now

    // for (let i = 0; i < count; i++) {
    //     const piece = document.createElement('div');
    //     piece.classList.add('confetti');
        
    //     // Vivid Rainbow Gradient
    //     piece.style.background = 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b008b)';
        
    //     // SIGNIFICANTLY LARGER SIZE
    //     // Width between 30px and 60px, Height between 15px and 25px
    //     piece.style.width = Math.random() * 20 + 30 + 'px';
    //     piece.style.height = Math.random() * 5 + 10 + 'px';
    //     piece.style.borderRadius = '4px'; // Rounded edges for a "ribbon" look

    //     const startX = window.innerWidth / 2;
    //     const startY = 0;
        
    //     // Adjust physics for larger pieces (slower, drifting)
    //     const destX = (Math.random() - 0.5) * 1200;
    //     const destY = (Math.random() * 900); 
    //     const rotation = (Math.random() - 0.5) * 1000;

    //     piece.style.left = startX + 'px';
    //     piece.style.top = startY + 'px';

    //     document.body.appendChild(piece);

    //     const duration = 4000 + Math.random() * 2000; // Lasts 4-6 seconds

    //     const animation = piece.animate([
    //         { transform: 'translate(-50%, -50%) rotate(0deg) scale(0)', opacity: 0 },
    //         { transform: 'translate(-50%, -50%) rotate(20deg) scale(1.2)', opacity: 1, offset: 0.1 }, // Pop out
    //         { transform: `translate(${destX}px, ${destY}px) rotate(${rotation}deg) scale(0.8)`, opacity: 0 }
    //     ], {
    //         duration: duration,
    //         easing: 'cubic-bezier(0.1, 1, 0.3, 1)',
    //         fill: 'forwards'
    //     });

    //     animation.onfinish = () => piece.remove();
    // }
    // }