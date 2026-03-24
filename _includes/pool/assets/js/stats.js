// Player Stats

function updateLifetimeStats() {

    const h = JSON.parse(localStorage.getItem('pool_match_history') || '[]');
    const container = document.getElementById('lifetime-stats-content');

    const rawInput = document.getElementById('playerSearch')?.value || "";
    const searchTermStrip = rawInput
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "") // Whitelist: Keep only letters, numbers, and spaces
        .trim();

    // Include DomPurify
const searchTerm = DOMPurify.sanitize(searchTermStrip);

    if (h.length === 0) {
        container.innerHTML = "No match history available.";
        return;
    }

    const statsByPlayer = {};

    h.forEach(m => {
        m.players.forEach(p => {
            const name = p.name || "Unknown Player";
            if (!statsByPlayer[name]) {
                statsByPlayer[name] = { wins: 0, games: 0, scratches: 0, bnr: 0, snap9: 0, break8: 0 };
            }
            statsByPlayer[name].games++;
            if (p.won) statsByPlayer[name].wins++;
            statsByPlayer[name].scratches += parseInt(p.scratches || 0);
            statsByPlayer[name].bnr += parseInt(p.breakandrun || 0);
            statsByPlayer[name].break8 += parseInt(p.count8onbreak || 0);
            statsByPlayer[name].snap9 += parseInt(p.count9onsnap || 0);
        });
    });

    const htmlArray = Object.entries(statsByPlayer)
        .filter(([name]) => name.toLowerCase().includes(searchTerm))
        .map(([name, s], index) => {
            const winRate = ((s.wins / s.games) * 100).toFixed(1);
            const avgScratches = (s.scratches / s.games).toFixed(1);

        return `
          <div class="accordion-item" id="player-container-${index}">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#player-collapse-${index}" 
                      aria-expanded="false" 
                      aria-controls="player-collapse-${index}">
                ${name}
              </button>
            </h2>
            <div id="player-collapse-${index}" class="accordion-collapse collapse" data-bs-parent="#lifetime-stats-content">
              <div class="accordion-body">
                <h3>Games Played: ${s.games}</h3>
                <div class="row">
                    <div class="p-3 text-center" style="width: 50%;">
                        <h5>Win Rate</h5>
                        <!-- The circular chart -->
                        <div class="win-rate-chart mx-auto" style="--percentage: ${winRate}%;">
                            <div class="chart-inner">${winRate}%</div>
                        </div>
                    </div>
                    <div class="p-3 text-center" style="width: 50%;">
                        <h5>Scratch Rate</h5>
                        <!-- The circular chart -->
                        <div class="win-rate-chart mx-auto" style="--percentage: ${avgScratches}%;">
                            <div class="chart-inner">${avgScratches}%</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col p-1">
                    <p class="text-center w-100 mb-0">Break & Run</p>
                    <button type="button" class="btn btn-primary disabled text-center w-100 p-3">${s.bnr}</button>
                    </div>
                    <div class="col p-1">
                    <p class="text-center w-100 mb-0">8 on the Break</p>
                    <button type="button" class="btn btn-primary disabled text-center w-100 p-3">${s.break8}</button>
                    </div>
                    <div class="col p-1">
                    <p class="text-center w-100 mb-0">9 on the Snap</p>
                    <button type="button" class="btn btn-primary disabled text-center w-100 p-3">${s.bnr}</button>
                    </div>
                </div>
              </div>
            </div>
          </div>`;
    });
    container.innerHTML = htmlArray.length > 0 ? htmlArray.join('') : "No players found matching that name.";
}
