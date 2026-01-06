function update() {
    if (isPaused) return;

    let head = {x: snake[0].x + velocity.x, y: snake[0].y + velocity.y};

    // Náraz do steny alebo seba
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || 
        snake.some(p => p.x === head.x && p.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        scoreNumber += 10;
        document.getElementById("scoreValue").innerText = scoreNumber;
        audio.apple.play();
        triggerVibration(40);
        spawnFood();
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Kresli jedlo
    ctx.drawImage(images.apple, food.x * block, food.y * block, block, block);

    // Kresli hada
    snake.forEach((p, i) => {
        let img = (i === 0) ? images.hRight : images.skin; // Zjednodušená logika hlavy
        ctx.drawImage(img, p.x * block, p.y * block, block, block);
    });
}

// Spustenie
document.getElementById("start").addEventListener("touchstart", () => {
    isPaused = false;
    document.getElementById("menu").style.display = "none";
    setInterval(() => { update(); draw(); }, intervalTime);
});

// Ovládanie šípkami
const ctrl = (x, y, dir) => {
    if ( (dir==="up" && snakeDirection!=="down") || (dir==="down" && snakeDirection!=="up") ||
         (dir==="left" && snakeDirection!=="right") || (dir==="right" && snakeDirection!=="left") ) {
        velocity = {x: x, y: y};
        snakeDirection = dir;
        triggerVibration(20);
    }
};

document.getElementById("control-up").onclick = () => ctrl(0, -1, "up");
document.getElementById("control-down").onclick = () => ctrl(0, 1, "down");
document.getElementById("control-left").onclick = () => ctrl(-1, 0, "left");
document.getElementById("control-right").onclick = () => ctrl(1, 0, "right");
