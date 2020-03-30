import {StaticObject} from '/js/object.js'
import Hunter from '/js/hunter.js';
import Prey from '/js/prey.js'
import Controller from '/js/controller.js'

let canvas = document.getElementById("game");
canvas.width = 800;
canvas.height = 800;
canvas.style.border = "1px solid #000000";
let ctx = canvas.getContext("2d");

let seaweed = new StaticObject(200, 75, "green", 25, 100);
let hunter = new Hunter(100, 75,"red", 25);
let prey = new Prey(300, 75, "blue", 15);

let controller = new Controller(prey);

let lastTime = 0;

function gameLoop(currentTime) {
    let deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    //CLEAR SCREEN
    ctx.clearRect(0, 0, 800, 800)

    //UPDATE DATA
    hunter.update(deltaTime);
    prey.update(deltaTime);
    controller.update();

    //DRAW
    seaweed.draw(ctx);
    hunter.draw(ctx);
    prey.draw(ctx);

    window.requestAnimationFrame(gameLoop)
}

gameLoop();