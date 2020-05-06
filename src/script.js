import Game from '/src/game.js';

let sprites = [];
sprites.push(document.getElementById("bush"));
sprites.push(document.getElementById("chest"));

let game = new Game(document.getElementById("game"), sprites);
$("#reset").click(() => {
    game = new Game(document.getElementById("game"), sprites);
});

window.addEventListener("resize", () => {
    game = new Game(document.getElementById("game"), sprites);
})


let lastTime = 0;
function gameLoop(currentTime) {
    let deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    game.draw();
    game.update(deltaTime);

    window.requestAnimationFrame(gameLoop)
}

window.requestAnimationFrame(gameLoop);