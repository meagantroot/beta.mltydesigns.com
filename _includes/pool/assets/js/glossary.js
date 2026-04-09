// Glossary of Pool Terms

const glossary = {
  "Ball-In-Hand": "(1) The advantage given to a player when their opponent scratches or otherwise fouls, wherein the player may place the cue ball anywhere on the table; (2) A defensive move to pass your turn at the table.",
  "Bank Shot": "Driving an object ball to a rail in the course of a shot.",
  "Break Shot": "The first shot of a game.",
  "Break and Run": "To break and then run the table without the opponent taking a turn at the table.",
  "Bridge": "(1) Hand that holds and guides the cue shaft; (2) The type of hold; (3) A shaped plate mounted or placed near or at the tip of a cue stick.",
  "Bye": "A placeholder in a schedule or Tournament for a missing team or participant. When there are an odd number of teams in a division or participants in a Tournament, there will be a bye. A team scheduled to play a bye does not play and no fees are due.",
  "Call Shot": "A shot in which the player must specify the intended ball and pocket before executing the shot.",
  "Carom": "The glancing of one ball off another.",
  "Combination Shot": "A shot in which the cue ball strikes an object ball, which then strikes another object ball in an attempt to pocket it.",
  "Counter-Safety": "A safety shot played in response to an opponent's safety, often with the intent of regaining control of the table.",
  "Cue Ball": "The white ball that a player strikes first when executing a shot.",
  "Defensive Shot": "A shot where there is no intent on the part of the shooter to pocket a ball of their category (8-Ball), or pocket any ball after contacting the lowest numbered ball on the table (9-Ball).",
  "Double-Hit": "An illegal shot involving the tip of the cue stick coming into contact with the cue ball twice during the execution of a single shot.",
  "Draw": "A method of stroking the cue ball that causes it to spin backwards after contact with an object ball.",
  "Draw Shot": "A shot in which the cue ball is intentionally made to spin backwards after contact with an object ball.",
  "English": "The side spin applied to the cue ball by striking it off-center with the cue stick, affecting the ball's trajectory and behavior after contact.",
  "Escape Shot": "Successfully hitting the object ball after being left in a hooked position.",
  "Established Skill Level": "A handicap that is based on 10 match scores in a given format.",
  "Follow": "A method of stroking the cue ball that causes it to follow the object ball in the same direction.",
  "Follow Shot": "A shot in which the cue ball is intentionally made to follow the object ball in the same direction after contact.",
  "Follow Through": "The motion of the cue stick carrying through the area previously occupied by the cue ball.",
  "Foot Rail": "(1) The short rail closest to the area where the balls are dispensed; (2) The short rail closest to where the balls are racked; (3) The rail opposite from the end used by the players to break (see Table Diagram).",
  "Foot Spot": "A spot placed in the exact center of an imaginary line drawn across the pool table between the second diamonds from the foot rail.",
  "Foul": "An illegal shot resulting in loss of turn at the table and ball-in-hand for the opponent.",
  "Frozen Ball": "A ball touching another ball or a rail.",
  "Head Rail": "The rail closest to the end used by the players to break (see Table Diagram).",
  "Head String": "The imaginary line drawn across the pool table between the second diamonds from the head rail.",
  "Hill-Hill Match": "The point in match play where both players need only one more game to win.",
  "Hooked/Snookered": "A situation where the cue ball is positioned in such a way that the player cannot directly hit the object ball they need to play next.",
  "Inning": "A completed cycle during which both players had one turn at the table.",
  "Jaw of the Pocket": "(1) The part of the cushion that is cut at an angle to form the opening.",
  "Jump Shot": "The striking of the cue ball with the cue tip, in a downward fashion.",
  "Kick Shot": "A shot that drives the cue ball to a rail before contacting the object ball.",
  "Kitchen": "The area of the table behind the head string.",
  "Lag": "Method used to determine who breaks in the first game.",
  "Massé Shot": "A shot in which a player curves the cue ball around another ball.",
  "Miscue": "A shot in which the cue's tip does not hit the cue ball squarely.",
  "Object Ball": "Any ball besides the cue ball.",
  "On the Hill": "Term used to indicate a player is one game away from winning their match.",
  "Open Table": "Term used to describe the status of an 8-Ball game, after the break shot.",
  "Original Members": "A term that refers to those members who were on a team when it gained qualification to a World Qualifier.",
  "Playing Surface": "The bed of the table.",
  "Pocket Marker": "A small marker used to indicate the target pocket.",
  "Push-Out": "A shot in 9-ball that requires announcing the intent to pushout.",
  "Push Shot": "A shot in which the cue ball is frozen to the object ball.",
  "Regular Shooting Cue": "Any standard pool cue designed to shoot the majority of shots.",
  "Rescue Shot": "A shot taken to get out of a difficult position, often involving a safety or a kick shot.",
  "Respot": "To place a ball back on the table after it has been pocketed, according to specific rules.",
  "Run Out": "To pocket all of one's balls in a single turn at the table.",
  "Safety": "A defensive action taken when a player has no makeable or high percentage shot.",
  "Safety Battle": "A situation where both players are engaged in a series of safety shots.",
  "Sandbagging": "The unethical practice of deliberately playing below your ability.",
  "Scratch": "(1) The pocketing of the cue ball; (2) Driving the cue ball off the playing surface.",
  "Session": "Refers to a season in which League play takes place.",
  "Sharking": "The unethical practice of distracting an opponent during their turn at the table.",
  "Slop Shot": "A shot in which the object ball is pocketed in an unintended manner, such as by bouncing off a rail or another ball.",
  "Soft Break": "Sometimes referred to as a safe break. A break shot that is executed at a level significantly less than the breaker's full strength. Also known as “breaking safe,” breaking soft is not allowed in APA matches.",
  "Specialty Cues": "Cues specially designed to perform specific shots.",
  "Stop Shot": "A method of stroking the cue ball that causes it to stop immediately after contact with an object ball.",
  "Stroke": "The forward motion of the cue stick during a shot.",
  "Table Scratch": "A scratch that occurs when the cue ball is driven off the playing surface or doesn't make contact with any balls on the table.",
  "Tangent Line": "An imaginary line that extends from the point of contact between the cue ball and an object ball, indicating the direction the cue ball will travel after contact.",
  "Timeout": "A break in play that allows a player to consult with their coach or team members for a limited time.",
  "Two-Way Shot": "An attempt to pocket a ball and leave one's opponent with a difficult shot if the attempt fails.",
  "8 on the Break": "A situation where the 8-ball is pocketed on the break shot.",
  "9 on the Snap": "A situation where the 9-ball is pocketed on the break shot."
};

function handleSearch(inputEl) {
  const value = inputEl.value;

  // 🔁 Sync all inputs
  document.querySelectorAll(".glossarySearch").forEach(input => {
    if (input !== inputEl) {
      input.value = value;
    }
  });

  // 🔄 Re-render both glossaries
  renderAllGlossaries(value);
}

function renderGlossary(targetId, searchValue = "") {
  const container = document.getElementById(targetId);
  if (!container) return;

  const searchInput = searchValue.toLowerCase();
  container.innerHTML = "";

  const entries = Object.entries(glossary)
    .filter(([term]) =>
      term.toLowerCase().includes(searchInput)
    )
    .sort((a, b) => a[0].localeCompare(b[0], undefined, { sensitivity: 'base' }));

  entries.forEach(([term, definition]) => {
    const item = document.createElement("div");
    item.classList.add("glossary-item");
    item.innerHTML = `<h3>${term}</h3><p>${definition}</p>`;
    container.appendChild(item);
  });
}

function renderAllGlossaries(searchValue = "") {
  renderGlossary("glossary-main", searchValue);
  renderGlossary("glossary-ingame", searchValue);
}

let debounceTimer;

function handleSearch(inputEl) {
  const value = inputEl.value;

  document.querySelectorAll(".glossarySearch").forEach(input => {
    if (input !== inputEl) input.value = value;
  });

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    renderAllGlossaries(value);
  }, 150);
}

// Initial render
renderAllGlossaries();