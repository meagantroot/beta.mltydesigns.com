// Game History

function displayHistory() {
    const h = JSON.parse(localStorage.getItem('pool_match_history') || '[]');

    document.getElementById('history-list').innerHTML = h.map(m => `
        <div class="list-group mb-1">
            <div class="list-group-item flex-column align-items-start active">
            <div class="d-flex w-100 justify-content-between">
                    ${m.mode === '8-ball' ? `
                        <div class="ball" data-id="8" style="margin-left: 0;">8</div>
                    ` : ''}
                    ${m.mode === '9-ball' ? `
                        <div class="ball" data-id="9" style="margin-left: 0;"">9</div>
                    ` : ''}
                    ${m.mode === '10-ball' ? `
                        <div class="ball" data-id="10" style="margin-left: 0;"">10</div>
                    ` : ''} 
                <div>
                </div>
            <div>
                <p class="text-end m-0 p-0"><small>${m.date}</small></p>
                <p class="text-end m-0 p-0"><small>${m.time}</small></p>
            </div>
        </div>
            </div>

            <div class="list-group-item flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">

                    <div class="col">
                        <p class="text-start"><span class="h4">${m.players[0].name}</span><br><strong>${m.players[0].score}/${m.players[0].target}</strong></p>
                        <p class="text-start">
                        Scratch Rate: ${m.players[0].rate}%<br>
                        Break and Run: ${m.players[0].breakandrun}<br>
                        ${m.mode === '8-ball' ? `
                            8 on the Break: ${m.players[0].count8onbreak}
                        ` : ''}
                        ${m.mode === '9-ball' ? `
                            9 on the Snap: ${m.players[0].count9onsnap}
                        ` : ''}
                        </p>
                    </div>
                    <div class="col">

                    <p class="text-end"><span class="h4">${m.players[1].name}</span><br><strong>${m.players[1].score}/${m.players[1].target}</strong></p>
                    <p class="text-end">
                        Scratch Rate: ${m.players[1].rate}%<br>
                        Break and Run: ${m.players[1].breakandrun}<br>
                        ${m.mode === '8-ball' ? `
                           8 on the Break: ${m.players[1].count8onbreak}
                        ` : ''}
                        ${m.mode === '9-ball' ? `
                            9 on the Snap: ${m.players[1].count9onsnap}
                        ` : ''}
                        </p>
                    </div>
                </div>
            </div>
        </div>`).join('') || "No matches.";
}