// Setup Icon for match setup

// document.querySelectorAll('input[name="gameMode"]').forEach(radio => {
//     radio.addEventListener('change', (e) => {
//         const iconElement = document.getElementById('mode-icon');
//         const mode = e.target.value;

//         const config = {
//             '8-ball':  { icon: '8', class: 'ball',  dataId: '8' },
//             '9-ball':  { icon: '9', class: 'ball',  dataId: '9' },
//             '10-ball': { icon: '10', class: 'ball', dataId: '10' }
//         };

//         const settings = config[mode];
//         if (settings) {
//             iconElement.innerText = settings.icon;
//             iconElement.className = settings.class;
//             iconElement.setAttribute('data-id', settings.dataId);
//         }
//     });
// });

// function reRack() {
//     if (confirm("Re-rack? This resets the table and groups but keeps the current scores and innings.")) {
//         // 1. Reset all balls to active
//         gameState.table.forEach(b => b.state = 'active');
        
//         // 2. Clear current 8-ball group assignments
//         gameState.players[0].group = null;
//         gameState.players[1].group = null;
        
//         // 3. Clear the current rack's ball sequence
//         gameState.rackBalls = []; 

//         saveGame();
//         alert("Table reset. Same player breaks.");
//     }
// }