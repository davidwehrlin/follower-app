import Game from '/src/game.js';

let canvas = document.getElementById("game");
let WIDTH = 800;
let HEIGHT = 800;
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.border = "1px solid #000000";
let ctx = canvas.getContext("2d");
let sprites = [];
sprites.push(document.getElementById("bush"));
sprites.push(document.getElementById("rock"));
sprites.push(document.getElementById("stump"));

let game = new Game(WIDTH, HEIGHT, sprites);

let lastTime = 0;
function gameLoop(currentTime) {
    let deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    
    game.update(deltaTime);
    game.draw(ctx);

    window.requestAnimationFrame(gameLoop)
}

window.requestAnimationFrame(gameLoop);