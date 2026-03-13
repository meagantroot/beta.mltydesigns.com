// // Undo Last Turn

function undoInning() {
    if (!gameState.history || gameState.history.length === 0) {
        alert("No innings to undo! Resetting the table.");
        gameState.currentInningIndex = 0;
        resetTable();
        // loadGame();
        // render();
        showGameUI();
        // return;
        // location.reload();
    }

    // 1. Pop the last snapshot
    const previousState = gameState.history.pop();

    // 2. Restore the entire state (this restores p.timeouts AND gameState.table)
    Object.assign(gameState, previousState);

    // 3. Persist the change
    saveGame();
    // 4. RE-RENDER the UI
    // This will re-run the ballGrid map logic and the timeout button template
    render(); 
}
