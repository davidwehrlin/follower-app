import Game from '/src/game.js';

let canvas = document.getElementById("game");
let WIDTH = 800;
let HEIGHT = 800;
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.border = "1px solid #000000";
let ctx = canvas.getContext("2d");

let game = new Game(800, 800);
let lastTime = 0;
function gameLoop(currentTime) {
    let deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    //CLEAR SCREEN
    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    //UPDATE HUNTER STATE

    //UPDATE MOVEMENTS
    game.update(deltaTime);

    //DRAW
    game.draw(ctx);

    window.requestAnimationFrame(gameLoop)
}

window.requestAnimationFrame(gameLoop);