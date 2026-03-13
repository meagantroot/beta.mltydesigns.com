// Time Outs

let timeoutInterval = null;
let activeTimeoutPlayerIdx = null;

function updateTimerDisplay(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    const display = document.getElementById('timer-display');
    if (display) {
        display.innerText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }
}

// function stopTimeout() {
//     clearInterval(timeoutInterval);
//     timeoutInterval = null; // Clear the reference
//     const modal = document.getElementById('timeout-modal');
//     if (modal) modal.style.display = 'none';
//     activeTimeoutPlayerIdx = null;
// }

function stopTimeout() {
    clearInterval(timeoutInterval);
    timeoutInterval = null;
    activeTimeoutPlayerIdx = null;

    // Target the Offcanvas element
    const offcanvasElement = document.getElementById('timeout-modal');
    if (offcanvasElement) {
        // Get the Bootstrap instance and call .hide()
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
        bsOffcanvas.hide();
    }
}


// function useTimeout(idx) {
//     const p = gameState.players[idx];
//     const mode = gameState.mode;
//     const theme = localStorage.theme;

//     if ( theme === "dark" ) {
//         ballColor = "rgb(33, 37, 41)";
//     } else {
//         ballColor = "white";
//     }
    
//     // Disable the button if no timeouts are left
//     if (p.timeouts <= 0) {
//         document.getElementById(`timeout-btn-${idx}`).disabled = true;
//     }

//     // // 1. Save snapshot for Undo BEFORE changing anything
//     // const stateCopy = JSON.parse(JSON.stringify(gameState));
//     // delete stateCopy.history; // Keep history clean
//     // gameState.history.push(stateCopy);
//     // if (gameState.history.length > 20) gameState.history.shift();

//     // 2. Proceed with logic
//     activeTimeoutPlayerIdx = idx;
//     p.timeouts--;
    
//     // 3. UI and Timer Logic
//     document.getElementById('timeout-player-name').innerText = `${p.name}'s Timeout`;
//     document.getElementById('timeout-modal').style.display = 'flex';

//     let timeLeft = 60;
//     updateTimerDisplay(timeLeft);



function useTimeout(idx) {
    const p = gameState.players[idx];
    const mode = gameState.mode;
    const theme = localStorage.theme;
    
    // 1. Guard clause: Stop if they are already at 0
    // if (p.timeouts <= 0) {
    //     alert("No timeouts remaining!");
    //     return;
    // }

    // Safety check: if somehow clicked while disabled, just exit
    if (p.timeouts <= 0) return;

    // 2. Proceed with logic
    activeTimeoutPlayerIdx = idx;
    p.timeouts--; // Decrement the count
    
    // 3. UPDATE THE UI (This fixes the display and the button state)
    // saveGame(); // Save the new count to localStorage
    render();   // This redraws the button with the new number and correct disabled state

    if (typeof saveGame === "function") saveGame();

    // 4. Show the Modal and Timer
    // const theme = localStorage.theme;
    const ballColor = theme === "dark" ? "rgb(33, 37, 41)" : "white";
    
    document.getElementById('timeout-player-name').innerText = `${p.name}'s Timeout`;
    document.getElementById('timeout-modal').style.display = 'flex';

    let timeLeft = 60;
    updateTimerDisplay(timeLeft);


    // Select the Spinner Ball

    if (mode === '8-ball') {
        document.getElementById('timeout-spinner').innerHTML = `<!-- 8 Ball Loader -->

<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    
  <!-- Group for background fills (fades in at the end) -->
  <g class="fill-colors">
    <circle cx="50" cy="50" r="45" fill="black" />
    <circle cx="50" cy="50" r="20" fill="white" />
  </g>

  <!-- Animated Drawing Outlines -->
  <!-- Main Ball -->
  <circle cx="50" cy="50" r="45" class="draw-path ball-outline" />
  
  <!-- White Center Circle -->
  <circle cx="50" cy="50" r="20" class="draw-path white-circle-outline" />

  <!-- The Number 8 (Converted to path for better drawing effect) -->
  <path class="draw-path number-outline" d="M50,42.5 A7.5,7.5 0 1,1 50,57.5 A7.5,7.5 0 1,1 50,42.5 M50,42.5 A5,5 0 1,0 50,32.5 A5,5 0 1,0 50,42.5"
        transform="translate(0, 5)" />
</svg>`;
    } else if (mode === '9-ball') {
        document.getElementById('timeout-spinner').innerHTML = `<!-- 9 Ball Loader -->

<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="200" height="200">

  <g class="fill-colors">
    <circle cx="50" cy="50" r="45" fill="#FFD700" /> <!-- Yellow Stripe -->
    <rect x="0" y="0" width="100" height="25" fill="${ballColor}" />
    <rect x="0" y="75" width="100" height="25" fill="${ballColor}" />
    <circle cx="50" cy="50" r="20" fill="white" />
  </g>
  <circle cx="50" cy="50" r="45" class="draw-path ball-outline" />
  <circle cx="50" cy="50" r="20" class="draw-path white-circle-outline" />
  <!-- Path for the number 9 -->
  <path class="draw-path number-outline" d="M55,45 A5,5 0 1,1 45,45 A5,5 0 1,1 55,45 M55,45 L55,60" />
</svg>`;
    } else if (mode === '10-ball') {
        document.getElementById('timeout-spinner').innerHTML = `<!-- 10 Ball Loader -->
        
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <g class="fill-colors">
    <circle cx="50" cy="50" r="45" fill="#0000FF" /> <!-- Blue Stripe -->
    <rect x="0" y="0" width="100" height="25" fill="${ballColor}" />
    <rect x="0" y="75" width="100" height="25" fill="${ballColor}" />
    <circle cx="50" cy="50" r="20" fill="white" />
  </g>
  <circle cx="50" cy="50" r="45" class="draw-path ball-outline" />
  <circle cx="50" cy="50" r="20" class="draw-path white-circle-outline" />
  <!-- Path for the number 10 -->
  <path class="draw-path number-outline" d="M42,42 L42,58 M58,50 A5,8 0 1,1 48,50 A5,8 0 1,1 58,50" />
</svg>`;
    }


timeoutInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay(timeLeft);
    if (timeLeft <= 0) {
        saveGame();
        stopTimeout();
    }
}, 1000);


}


function cancelTimeout() {
    if (activeTimeoutPlayerIdx !== null) {
        gameState.players[activeTimeoutPlayerIdx].timeouts++;
        saveGame();
        stopTimeout();
    }
}


// Handle history
function saveHistory() {
    const stateCopy = JSON.parse(JSON.stringify(gameState));
    delete stateCopy.history; // Avoid recursive history
    gameState.history.push(stateCopy);
    if (gameState.history.length > 20) gameState.history.shift();
}