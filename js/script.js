import {StaticObject} from '/js/object.js'
import Hunter from '/js/hunter.js';
import Prey from '/js/prey.js'

let canvas = document.getElementById("game");
canvas.width = 800;
canvas.height = 800;
canvas.style.border = "1px solid #000000";
let ctx = canvas.getContext("2d");

let seaweed = new StaticObject(200, 75, "green", 50, 100);
let hunter = new Hunter(100, 75,"red", 25);
let prey = new Prey(300, 75, "blue", 15);

seaweed.draw(ctx);
hunter.draw(ctx);
prey.draw(ctx);