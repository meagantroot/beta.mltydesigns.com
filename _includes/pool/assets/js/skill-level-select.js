// This function sets up and controls the skill level section process during game setup.

// Skill Level Selectors
document.addEventListener('DOMContentLoaded', () => {
    const p1Slider = document.getElementById('p1Skill');
    const p2Slider = document.getElementById('p2Skill');
    const p1Display = document.getElementById('p1skillValue');
    const p2Display = document.getElementById('p2skillValue');

    // 1. Update the function to accept both the value AND the target element
    function updateSlider(slider, display) {
        const val = slider.value;
        display.innerText = val;
    }

    // 2. Initial run for both
    if (p1Slider && p1Display) updateSlider(p1Slider, p1Display);
    if (p2Slider && p2Display) updateSlider(p2Slider, p2Display);

    // 3. Independent listeners
    p1Slider.addEventListener('input', () => updateSlider(p1Slider, p1Display));
    p2Slider.addEventListener('input', () => updateSlider(p2Slider, p2Display));
});


// Set Limits based on game mode
function updateSkillLimits() {
    const is9Ball = document.getElementById('gamemode9').checked;
    const newMin = is9Ball ? 1 : 2;
    const newMax = is9Ball ? 9 : 8;

    const ids = ['p1Skill', 'p2Skill'];

    ids.forEach(id => {
        const input = document.getElementById(id);
        const display = document.getElementById(id + 'Value');
        
        if (input) {
            // 1. Update the range constraints
            input.min = newMin;
            input.max = newMax;

            // 2. Reset the value to 5
            input.value = 5;

            // 3. Update the text display
            if (display) {
                display.innerText = 5;
            }

            // 4. Trigger the 'input' event manually
            // This tells other parts of your script that the value has changed
            input.dispatchEvent(new Event('input'));
        }
    });
}

// Keep your existing listeners
document.querySelectorAll('input[name="gameMode"]').forEach(radio => {
    radio.onclick = updateSkillLimits;
});

// Run once on load
updateSkillLimits();