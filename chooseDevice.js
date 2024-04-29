function startGame() {
    const modeSelect = document.getElementById('modeSelect');
    const deviceSelect = document.getElementById('deviceSelect');
    const mode = modeSelect.value;
    const device = deviceSelect.value;

    if (device === 'mobile') {
        changeOrientation();
    }

    window.location.href = `game.html?mode=${mode}&device=${device}`;
}

function changeOrientation() {
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(function(error) {
            console.warn("Screen orientation lock failed: ", error);
        });
    }
}
