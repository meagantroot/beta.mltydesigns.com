// Celebrate Special Achivements

function award(idx,awardType) {
    const p = gameState.players[idx];
    const mode = gameState.mode;
    const theme = localStorage.theme;
    
    console.log("Awarding a: " + awardType);

    render();   // This redraws the button with the new number and correct disabled state

    if (typeof saveGame === "function") saveGame();

    const ballColor = theme === "dark" ? "rgb(33, 37, 41)" : "white";

    launchConfetti();

    // Select the Award Ball

    if (mode === '8-ball') {
        document.getElementById('award-ball').innerHTML = `<div><h4>Woah, did you see that?</h4><div><!-- 8 Ball Loader -->

<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    
  <!-- Group for background fills (fades in at the end) -->
  <g class="fill-colors-award">
    <circle cx="50" cy="50" r="45" fill="black" />
    <circle cx="50" cy="50" r="20" fill="white" />
  </g>

  <!-- Animated Drawing Outlines -->
  <!-- Main Ball -->
  <circle cx="50" cy="50" r="45" class="draw-path-award ball-outline" />
  
  <!-- White Center Circle -->
  <circle cx="50" cy="50" r="20" class="draw-path-award white-circle-outline" />

  <!-- The Number 8 (Converted to path for better drawing effect) -->
  <path class="draw-path-award number-outline" d="M50,42.5 A7.5,7.5 0 1,1 50,57.5 A7.5,7.5 0 1,1 50,42.5 M50,42.5 A5,5 0 1,0 50,32.5 A5,5 0 1,0 50,42.5"
        transform="translate(0, 5)" />
</svg><h2>${awardType}</h2>`;
    } else if (mode === '9-ball') {
        document.getElementById('award-ball').innerHTML = `<div><h4>Woah, did you see that?</h4><div><!-- 9 Ball Loader -->

<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="200" height="200">

  <g class="fill-colors-award">
    <circle cx="50" cy="50" r="45" fill="#FFD700" /> <!-- Yellow Stripe -->
    <rect x="0" y="0" width="100" height="25" fill="${ballColor}" />
    <rect x="0" y="75" width="100" height="25" fill="${ballColor}" />
    <circle cx="50" cy="50" r="20" fill="white" />
  </g>
  <circle cx="50" cy="50" r="45" class="draw-path-award ball-outline" />
  <circle cx="50" cy="50" r="20" class="draw-path-award white-circle-outline" />
  <!-- Path for the number 9 -->
  <path class="draw-path-award number-outline" d="M55,45 A5,5 0 1,1 45,45 A5,5 0 1,1 55,45 M55,45 L55,60" />
</svg><h2>${awardType}</h2>`;
    } else if (mode === '10-ball') {
        document.getElementById('award-ball').innerHTML = `<div><h4>Woah, did you see that?</h4><div><!-- 10 Ball Loader -->
        
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <g class="fill-colors-award">
    <circle cx="50" cy="50" r="45" fill="#0000FF" /> <!-- Blue Stripe -->
    <rect x="0" y="0" width="100" height="25" fill="${ballColor}" />
    <rect x="0" y="75" width="100" height="25" fill="${ballColor}" />
    <circle cx="50" cy="50" r="20" fill="white" />
  </g>
  <circle cx="50" cy="50" r="45" class="draw-path-award ball-outline" />
  <circle cx="50" cy="50" r="20" class="draw-path-award white-circle-outline" />
  <!-- Path for the number 10 -->
  <path class="draw-path-award number-outline" d="M42,42 L42,58 M58,50 A5,8 0 1,1 48,50 A5,8 0 1,1 58,50" />
</svg><h2>${awardType}</h2>`;
    }

}
