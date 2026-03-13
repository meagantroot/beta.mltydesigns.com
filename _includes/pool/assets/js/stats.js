// Player Stats

function updateLifetimeStats() {
    const h = JSON.parse(localStorage.getItem('pool_match_history') || '[]');
    if (h.length === 0) {
        document.getElementById('lifetime-stats-content').innerHTML = "No match history available.";
        return;
    }

    // Group stats by player name
    const statsByPlayer = {};

    h.forEach(m => {
        m.players.forEach(p => {
            const name = p.name || "Unknown Player";

            // Initialize player object if first time seeing them
            if (!statsByPlayer[name]) {
                statsByPlayer[name] = { wins: 0, games: 0, scratches: 0, bnr: 0, snap9: 0, break8: 0 };
            }

            // Accumulate stats
            statsByPlayer[name].games++;
            if (p.won) statsByPlayer[name].wins++;
            statsByPlayer[name].scratches += parseInt(p.scratches || 0);
            statsByPlayer[name].bnr += parseInt(p.breakandrun || 0);
            statsByPlayer[name].break8 += parseInt(p.count8onbreak || 0);
            statsByPlayer[name].snap9 += parseInt(p.count9onsnap || 0);
        });
    });

    // Generate HTML List
    let html = "";
    for (const [name, s] of Object.entries(statsByPlayer)) {
        const winRate = ((s.wins / s.games) * 100).toFixed(1);
        const avgScratches = (s.scratches / s.games).toFixed(1);

        // For a standard pool set (balls 1 through 15)
        const min = 1;
        const max = 15;
        const randomBall = Math.floor(Math.random() * (max - min + 1)) + min;

        // <div class="ball" data-id="${randomBall}">${randomBall}</div>

        html += `<tr><td>${name}</td><td class="text-center">${winRate}%</td><td class="text-center">${avgScratches}</td><td class="text-center">${s.bnr}</td><td class="text-center">${s.break8}</td><td class="text-center">${s.snap9}</td><td class="text-center">${s.games}</td></tr>`;
    }

    document.getElementById('lifetime-stats-content').innerHTML = html;
}