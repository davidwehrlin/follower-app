import Hunter from '/src/hunter.js'
import {SEARCH} from '/src/hunter.js'
import Prey from '/src/prey.js';
import Controller from '/src/controller.js';

const GAMESTATE = {
    MENU: 0,
    PLAYING: 1,
    PAUSED: 2
}



export default class Game {
    constructor (WIDTH, HEIGHT) {
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
        this.GRID_SIZE = 25;
        this.gameState = GAMESTATE.MENU;

        this.prey = new Prey(this, "blue");
        this.hunter = new Hunter(this, "red");
        this.hunter.algorithm = SEARCH.GREEDY;
        this.controller = new Controller(this.prey);

        this.grid = new Map();
        let gridLen = WIDTH / this.GRID_SIZE;
        for (let i = 0; i < gridLen; i++) {
            for (let j = 0; j < gridLen; j++) {
                this.grid.set([i, j], []);
            }
        }
    }

    update(deltaTime) {
        switch (this.gameState) {
            case GAMESTATE.MENU:
                if (this.controller.keyState[' ']) {
                    this.gameState = GAMESTATE.PLAYING;
                }
                break;
            case GAMESTATE.PLAYING:
                //IF DONE GO TO MENU
                if (this.controller.keyState["Escape"]) {
                    this.gameState = GAMESTATE.PAUSED;
                }
                this.hunter.update(deltaTime, this.prey);
                this.prey.update(deltaTime, this.controller);
                break;

            case GAMESTATE.PAUSED:
                if (this.controller.keyState[' ']) {
                    this.gameState = GAMESTATE.PLAYING;
                }
                break;
            

        }
        
    }

    draw(context) {
        switch (this.gameState) {
            case GAMESTATE.MENU:
                context.textAlign = "center";
                context.font = "50px Arial"
                context.fillText(
                    "PRESS SPACEBAR TO PLAY", 
                    400, 
                    400);
                break;
            case GAMESTATE.PLAYING:
                //TODO: DRAW MAP
                context.clearRect(0, 0, this.WIDTH, this.HEIGHT);
                this.hunter.draw(context);
                this.prey.draw(context);
                break;
            case GAMESTATE.PAUSED:
                context.textAlign = "center";
                context.font = "50px Arial";
                context.fillStyle = "black";
                context.fillText(
                    "PAUSED GAME", 
                    400, 
                    400); 
                break;
        }
        
    }

    reset() {

    }

    start() {

    }
    
}