import Game from '/src/game.js';

let canvas = document.getElementById("game");
let WIDTH = 800;
let HEIGHT = 800;
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.border = "1px solid #000000";
let ctx = canvas.getContext("2d");
let game = new Game(WIDTH, HEIGHT);

let lastTime = 0;
function gameLoop(currentTime) {
    let deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    
    game.update(deltaTime);
    game.draw(ctx);

    window.requestAnimationFrame(gameLoop)
}

window.requestAnimationFrame(gameLoop);