function spawnFood() {
    food = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20)
    };
    // Kontrola, aby sa jedlo neobjavilo v hadovi
    if (snake.some(p => p.x === food.x && p.y === food.y)) spawnFood();
}

function triggerVibration(ms = 50) {
    if (vibrationEnabled && navigator.vibrate) navigator.vibrate(ms);
}

function gameOver() {
    triggerVibration(200);
    audio.hit.play();
    alert("Game Over! Skóre: " + scoreNumber);
    
    let best = localStorage.getItem("bestScore") || 0;
    if (scoreNumber > best) localStorage.setItem("bestScore", scoreNumber);
    
    location.reload();
}
