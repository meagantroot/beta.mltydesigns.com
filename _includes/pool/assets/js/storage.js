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

// Import Data
// function importBackup(e) {
//     const reader = new FileReader();
//     reader.onload = (ev) => {
//         const d = JSON.parse(ev.target.result);
//         if (d.active) localStorage.setItem('pool_score_data', JSON.stringify(d.active));
//         if (d.history) localStorage.setItem('pool_match_history', JSON.stringify(d.history));
//         location.reload();
//     };
//     reader.readAsText(e.target.files[0]);
// }

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
            location.reload();
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
    diceEl.innerText = "?";

    // Simulate "rolling" time
    setTimeout(() => {
        const result = options[Math.floor(Math.random() * options.length)];
        
        // Stop animation and show result
        diceEl.classList.remove('rolling');
        diceEl.innerText = result;
        
    }, 900);
}

function setGameModeFromDice(num) {
    gameState.mode = `${num}-ball`;
    console.log("Game mode set to:", gameState.mode);
    // Call your existing render function here if needed
    if (typeof renderGame === "function") renderGame();
}
