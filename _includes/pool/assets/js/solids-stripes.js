// Sets the player's Solids or Stripes status in 8-ball

function assignGroups(selected) {
    if (gameState.mode !== '8-ball') return;
    const p = gameState.players[gameState.currentTurn], opponent = gameState.players[gameState.currentTurn === 0 ? 1 : 0];
    if (p.group) return;

    for (let id of selected) {
        if (id >= 1 && id <= 7) { p.group = 'Solids'; opponent.group = 'Stripes'; break; }
        if (id >= 9 && id <= 15) { p.group = 'Stripes'; opponent.group = 'Solids'; break; }
    }
}