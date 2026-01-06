// OVLÁDANIE - Touch eventy pre rok 2026 (bez lagu)
const handleControl = (x, y, dir) => {
    if (isPaused) return;
    // Zamedzenie otočenia o 180 stupňov
    if (dir === "up" && snakeDirection === "down") return;
    if (dir === "down" && snakeDirection === "up") return;
    if (dir === "left" && snakeDirection === "right") return;
    if (dir === "right" && snakeDirection === "left") return;

    velocity = {x: x, y: y};
    snakeDirection = dir;
    if (navigator.vibrate) navigator.vibrate(20);
};

document.getElementById("control-up").addEventListener("touchstart", (e) => { e.preventDefault(); handleControl(0, -1, "up"); });
document.getElementById("control-down").addEventListener("touchstart", (e) => { e.preventDefault(); handleControl(0, 1, "down"); });
document.getElementById("control-left").addEventListener("touchstart", (e) => { e.preventDefault(); handleControl(-1, 0, "left"); });
document.getElementById("control-right").addEventListener("touchstart", (e) => { e.preventDefault(); handleControl(1, 0, "right"); });

// HLAVNÝ CYKLUS
function gameLoop() {
    if (isPaused) return;

    let head = {x: snake[0].x + velocity.x, y: snake[0].y + velocity.y};

    // Kolízia (stena alebo seba)
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || snake.some(p => p.x === head.x && p.y === head.y)) {
        document.getElementById("hitWall").play();
        alert("Game Over!");
        location.reload();
        return;
    }

    snake.unshift(head);

    // Jedlo
    if (head.x === food.x && head.y === food.y) {
        scoreNumber += 10;
        document.getElementById("scoreValue").innerText = scoreNumber;
        document.getElementById("soundApple").play();
        spawnFood();
    } else {
        snake.pop();
    }

    render();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images.apple, food.x * block, food.y * block, block, block);
    snake.forEach((p, i) => {
        let img = (i === 0) ? images.hRight : images.skin;
        ctx.drawImage(img, p.x * block, p.y * block, block, block);
    });
}

function spawnFood() {
    food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
}

// Štart hry
document.getElementById("start").onclick = () => {
    isPaused = false;
    document.getElementById("menu").style.display = "none";
    setInterval(gameLoop, intervalTime);
};

// Skrytie preloadera
window.onload = () => document.getElementById("preload").style.display = "none";
