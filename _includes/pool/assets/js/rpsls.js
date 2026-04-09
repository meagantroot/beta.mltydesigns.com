// Rock Paper Sissors Lizard Spock Game Logic

const winningMoves = {
    rock: { scissors: 'crushes', lizard: 'crushes' },
    paper: { rock: 'covers', spock: 'disproves' },
    scissors: { paper: 'cuts', lizard: 'decapitates' },
    lizard: { spock: 'poisons', paper: 'eats' },
    spock: { scissors: 'smashes', rock: 'vaporizes' }
};

// Define the function
function rpslsInit() {
    const p1Name = clean(document.getElementById('p1Name').value || "Player 1");
    const p2Name = clean(document.getElementById('p2Name').value || "Player 2");

    // console.log(`RPSLS Game Initialized: ${p1Name} vs ${p2Name}`);


    // Use backticks and inject the names into the HTML string
    document.getElementById('rpsls-container').innerHTML =`
      <h5 id="main-status" style="text-align: center;">Waiting for ${p1Name}</h5>
      <div id="p1-section" class="container player-area active-p1">
          <div class="d-flex justify-content-center flex-wrap">
              <button class="btn btn-outline-info btn-choice rpsls-btn" onclick="pick(1, 'rock')"><span class="p-0 m-0 emoji">✊</span></button>
              <button class="btn btn-outline-info btn-choice rpsls-btn" onclick="pick(1, 'paper')"><span class="p-0 m-0 emoji">✋</span></button>
              <button class="btn btn-outline-info btn-choice rpsls-btn" onclick="pick(1, 'scissors')"><span class="p-0 m-0 emoji">✌️</span></button>
              <button class="btn btn-outline-info btn-choice rpsls-btn" onclick="pick(1, 'lizard')"><span class="p-0 m-0 emoji">🦎</span></button>
              <button class="btn btn-outline-info btn-choice rpsls-btn" onclick="pick(1, 'spock')"><span class="p-0 m-0 emoji">🖖</span></button>
          </div>
      </div>

      <div id="p2-section" class="container player-area locked">
          <div class="d-flex justify-content-center flex-wrap">
              <button class="btn btn-outline-danger btn-choice rpsls-btn" onclick="pick(2, 'rock')"><span class="p-0 m-0 emoji">✊</span></button>
              <button class="btn btn-outline-danger btn-choice rpsls-btn" onclick="pick(2, 'paper')"><span class="p-0 m-0 emoji">✋</span></button>
              <button class="btn btn-outline-danger btn-choice rpsls-btn" onclick="pick(2, 'scissors')"><span class="p-0 m-0 emoji">✌️</span></button>
              <button class="btn btn-outline-danger btn-choice rpsls-btn" onclick="pick(2, 'lizard')"><span class="p-0 m-0 emoji">🦎</span></button>
              <button class="btn btn-outline-danger btn-choice rpsls-btn" onclick="pick(2, 'spock')"><span class="p-0 m-0 emoji">🖖</span></button>
          </div>
      </div>

      <div class="container pb-3">
          <div id="reveal-zone" class="hidden w-100 text-center">
                <h5 id="logic-text" class="title fw-bold mt-2"></h5>

            <div class="row">
                <div class="col text-start"><h5 class="mb-1">${p1Name}</h5><p><span id="p1-final">?</span></p></div>
                <div class="col text-end"><h5 class="mb-1">${p2Name}</h5><p><span id="p2-final">?</span></p></div>
            </div>

              <button class="btn btn-lg btn-dark mt-2 p-4 w-100" onclick="resetRPSLSGame()">Play Again</button>
              <button id="rpsls-start-match-btn" class="btn btn-lg btn-success mt-2 p-4 w-100 hidden" onclick="startGame()" data-bs-dismiss="offcanvas">Start Game</button>
          </div>

        <div class="alert alert-info mt-3" role="alert">
            <h4 class="alert-heading mt-2">How to Play</h4>
            <p class="mb-0">Similar to Rock Paper Scissors, <strong>${p1Name}</strong> selects their move, then <strong>${p2Name}</strong> selects their move. The winner breaks first!</p>
            <h5 class="mt-3">Winning Moves</h5>
            <ul>
                <li>Rock Crushes Scissors and Crushes Lizard</li>
                <li>Paper Covers Rock and Disproves Spock</li>
                <li>Scissors Cuts Paper and Decapitates Lizard</li>
                <li>Lizard Eats Paper and Poisons Spock</li>
                <li>Spock Vaporizes Rock and Smashes Scissors</li>
            </ul>
        </div>
      </div>`;
}

// Define the winning logic

    function pick(p, move) {

        const p2Name = document.getElementById('p2Name').value || "Player 2";

        if(p === 1) {
            p1Move = move;
            // Lock P1, Unlock P2
            document.getElementById('p1-section').classList.add('locked');
            document.getElementById('p2-section').classList.remove('locked');
            document.getElementById('p2-section').classList.add('active-p2');
            document.getElementById('main-status').innerText = `${p2Name}'s turn`;
        } else {
            p2Move = move;
            document.getElementById('p2-section').classList.add('locked');
            showResult();
        }
    }

    function showResult() {
        const status = document.getElementById('main-status');
        const logic = document.getElementById('logic-text');
        
        document.getElementById('p1-final').innerText = p1Move.toUpperCase();
        document.getElementById('p2-final').innerText = p2Move.toUpperCase();
        document.getElementById('reveal-zone')?.classList.remove('hidden');

        const p1Name = document.getElementById('p1Name').value || "Player 1";
        const p2Name = document.getElementById('p2Name').value || "Player 2";

        if (p1Move === p2Move) {
            status.innerText = "It's a Tie!";
            logic.innerText = "Both players chose " + p1Move;
        } else if (winningMoves[p1Move][p2Move]) {
            status.innerText = `${p1Name} Wins!`;
            logic.innerText = p1Move.charAt(0).toUpperCase() + p1Move.slice(1) + 
                          " " + winningMoves[p1Move][p2Move] + " " + p2Move + "!";
            document.getElementById('p1Starts').checked = true; // Syncs with radio logic
            document.getElementById('rpsls-start-match-btn')?.classList.remove('hidden');

        } else {
            status.innerText = `${p2Name} Wins!`;
            logic.innerText = p2Move.charAt(0).toUpperCase() + p2Move.slice(1) + 
                          " " + winningMoves[p2Move][p1Move] + " " + p1Move + "!";
            document.getElementById('p2Starts').checked = true; // Syncs with radio logic
            document.getElementById('rpsls-start-match-btn')?.classList.remove('hidden');
        }
    }

    function resetRPSLSGame() {

        // Grab current name from input
        const p1Name = document.getElementById('p1Name').value || "Player 1";
        const startBtn = document.getElementById('rpsls-start-match-btn');
        if (startBtn) {
            startBtn.classList.add('hidden');
        }

        p1Move = null; p2Move = null;
        document.getElementById('reveal-zone').classList.add('hidden');
        document.getElementById('p1-section').classList.remove('locked');
        document.getElementById('p2-section').classList.add('locked');
        document.getElementById('p2-section').classList.remove('active-p2');
        document.getElementById('main-status').innerText = `Waiting for ${p1Name}`;

    }
