// Storage Meter

function updateStorageMeter() {
    // Calculate current localStorage usage (in bytes)
    let used = 0;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        // Each character in UTF-16 uses 2 bytes
        used += (key.length + value.length) * 2;
    }

    // Set the standard localStorage limit (5MB)
    const limit = 5 * 1024 * 1024;

    // Update the UI
    const usedMB = (used / 1024 / 1024).toFixed(5);
    const limitMB = (limit / 1024 / 1024).toFixed(0);

    // Set bar width based on the 5MB cap
    document.getElementById('storage-bar').style.width = Math.min((used / limit * 100), 100) + "%";

    // Update text to show current usage vs the 5MB limit
    document.getElementById('storage-text').innerText = `${usedMB} MB / ${limitMB} MB`;
}

// Clear All History
function clearHistory() {
    if (confirm("Delete all history?")) {
        localStorage.removeItem('pool_match_history'); location.reload();
    }
}

// Export Data
function downloadBackup() {
    const data = { active: gameState, history: JSON.parse(localStorage.getItem('pool_match_history')) };
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "pool_backup.json"; a.click();
}

function importBackup(e) {
    const file = e.target.files[0];

    // Check if a file was actually selected
    if (!file) return;

    // Hard block: Check if the file extension is .json
    if (!file.name.endsWith('.json')) {
        alert("Please select a valid .json file.");
        e.target.value = ''; // Reset the input
        return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
        try {
            const d = JSON.parse(ev.target.result);
            
            if (d.active) localStorage.setItem('pool_score_data', JSON.stringify(d.active));
            if (d.history) localStorage.setItem('pool_match_history', JSON.stringify(d.history));
            
            alert("Backup imported successfully!");
            localStorage.removeItem('pool_score_data'); location.reload();
        } catch (err) {
            // Catches errors if the file content isn't valid JSON
            alert("Error: The file content is not valid JSON.");
            console.error("JSON Parse Error:", err);
        }
    };
    reader.readAsText(file);
}

// Random Game Selection

function rollDiceUI() {
    const diceEl = document.getElementById('pool-dice');
    const options = [8, 9, 10];
    
    // Start animation
    diceEl.classList.add('rolling');
    diceEl.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style="width: 100%">
                <circle cx="100" cy="100" r="94" fill="black" stroke="#999" stroke-width="2"/>
                <circle cx="100" cy="100" r="45" fill="white"/>
                <text x="100" y="115" font-size="50" text-anchor="middle" fill="black" font-family="Arial" font-weight="bold">?</text>
                </svg>`;

    // Simulate "rolling" time
    setTimeout(() => {
        const result = options[Math.floor(Math.random() * options.length)];
        
        // Stop animation and show result
        diceEl.classList.remove('rolling');

        if (result === 8) {
            diceEl.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style="width: 100%">
                <circle cx="100" cy="100" r="94" fill="black" stroke="#999" stroke-width="2"/>
                <circle cx="100" cy="100" r="45" fill="white"/>
                <text x="100" y="115" font-size="50" text-anchor="middle" fill="black" font-family="Arial" font-weight="bold">8</text>
                </svg>`;
        } else if (result === 9) {
            diceEl.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style="width: 100%">
                <defs>
                    <clipPath id="clip">
                    <circle cx="100" cy="100" r="94"/>
                    </clipPath>
                </defs>
                <circle cx="100" cy="100" r="94" fill="white" stroke="#999" stroke-width="2"/>
                <rect x="0" y="45" width="200" height="110" fill="#FDD017" clip-path="url(#clip)"/>
                <circle cx="100" cy="100" r="45" fill="white"/>
                <text x="100" y="115" font-size="50" text-anchor="middle" fill="black" font-family="Arial" font-weight="bold">9</text>
                </svg>`;
        } else {
            diceEl.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style="width: 100%">
            <defs>
                <clipPath id="clip">
                <circle cx="100" cy="100" r="94"/>
                </clipPath>
            </defs>
            <circle cx="100" cy="100" r="94" fill="white" stroke="#999" stroke-width="2"/>
            <rect x="0" y="45" width="200" height="110" fill="#2B65EC" clip-path="url(#clip)"/>
            <circle cx="100" cy="100" r="45" fill="white"/>
            <text x="100" y="115" font-size="50" text-anchor="middle" fill="black" font-family="Arial" font-weight="bold">10</text>
            </svg>`;
        }

        
    }, 900);
}

function setGameModeFromDice(num) {
    gameState.mode = `${num}-ball`;
    console.log("Game mode set to:", gameState.mode);
    // Call your existing render function here if needed
    if (typeof renderGame === "function") renderGame();
}
