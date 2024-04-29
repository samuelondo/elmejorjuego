function startGame() {
    const modeSelect = document.getElementById('modeSelect');
    const deviceSelect = document.getElementById('deviceSelect');
    const mode = modeSelect.value;
    const device = deviceSelect.value;
    window.location.href = `game.html?mode=${mode}&device=${device}`;
}