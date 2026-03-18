// Game History

function displayHistory() {
    const h = JSON.parse(localStorage.getItem('pool_match_history') || '[]');

document.getElementById('history-list').innerHTML = h.map((m, index) => {

    // console.log("Current item:", m);

return `<div class="accordion accordion-flush list-group mb-1" id="accordion-${index}">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#history-list-${index}" aria-expanded="false" aria-controls="history-list-${index}">
        <!-- Icon section -->
        <div class="me-3">
            ${m.mode === '8-ball' ? `<div class="ball" data-id="8" style="margin-left: 0;">8</div>` : ''}
            ${m.mode === '9-ball' ? `<div class="ball" data-id="9" style="margin-left: 0;">9</div>` : ''}
            ${m.mode === '10-ball' ? `<div class="ball" data-id="10" style="margin-left: 0;">10</div>` : ''} 
        </div>

        <!-- Text section -->
        <div class="text-start">
            <p class="m-0 p-0"><strong>${m.players[0].name} vs. ${m.players[1].name}</strong></p>
            <p class="m-0 p-0 text-muted"><small>${m.date} - ${m.time}</small></p>
            <p class="m-0 p-0 text-muted"><small>${m.mode}</small></p>
        </div>
      </button>
    </h2>
    <div id="history-list-${index}" class="accordion-collapse collapse" data-bs-parent="#accordion-${index}">
      <div class="accordion-body">
            <div class="d-flex w-100 justify-content-between">
                <div class="col">
                    <p class="text-start"><span class="h4">${m.players[0].name}</span><br><strong>${m.players[0].score}/${m.players[0].target}</strong></p>
                    <p class="text-start">
                    ${m.players[0].skill != null ? 'SL: '+ m.players[0].skill : ''}<br>
                    Scratch Rate: ${m.players[0].rate}%<br>
                    Break and Run: ${m.players[0].breakandrun}<br>
                    ${m.mode === '8-ball' ? `8 on the Break: ${m.players[0].count8onbreak}` : ''}
                    ${m.mode === '9-ball' ? `9 on the Snap: ${m.players[0].count9onsnap}` : ''}
                    </p>
                </div>
                <div class="col">
                    <p class="text-end"><span class="h4">${m.players[1].name}</span><br><strong>${m.players[1].score}/${m.players[1].target}</strong></p>
                    <p class="text-end">
                    ${m.players[1].skill != null ? 'SL: '+ m.players[1].skill : ''}<br>
                    Scratch Rate: ${m.players[1].rate}%<br>
                    Break and Run: ${m.players[1].breakandrun}<br>
                    ${m.mode === '8-ball' ? `8 on the Break: ${m.players[1].count8onbreak}` : ''}
                    ${m.mode === '9-ball' ? `9 on the Snap: ${m.players[1].count9onsnap}` : ''}
                    </p>
                </div>
            </div>
        </div>
    </div>
  </div>
</div>`

}).join('') || "No matches.";

}