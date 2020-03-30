import Hunter from './hunter.js'
import Prey from './prey.js';
import Controller from './controller.js';

const GAMESTATE = {
    IDLE: 0,
    PLAYING: 1,
    PAUSED: 2
}

const GRID_SIZE = 25;

export default class Game {
    constructor (WIDTH, HEIGHT) {
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
        this.gameState = GAMESTATE.IDLE;

        this.prey = new Prey(this, "blue");
        this.hunter = new Hunter(this, "red", this.prey);
        this.controller = new Controller(this.prey);

        this.grid = {};
        let gridLen = WIDTH / GRID_SIZE;
        for (let i = 0; i < gridLen; i++) {
            for (let j = 0; j < gridLen; j++) {
                this.grid[[i,j]] = [];
            }
        }
    }

    update(deltaTime) {
        this.hunter.pursue(this.prey);
        this.hunter.update(deltaTime);
        this.controller.update();
        this.prey.update(deltaTime);
    }

    draw(context) {
        this.hunter.draw(context);
        this.prey.draw(context);
    }
    
}