import Hunter from '/src/hunter.js';
import Board from '/src/board.js';
import Prey from '/src/prey.js';
import Controller from '/src/controller.js';

const GAMESTATE = {
    MENU: 0,
    PLAYING: 1,
    PAUSED: 2,
    WINNING: 3
}



export default class Game {
    constructor (WIDTH, HEIGHT, sprites) {
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
        this.sprites = sprites;
        this.GRID_SIZE = 50;
        this.gameState = GAMESTATE.MENU;
        this.time = 0
        
        this.board = new Board(this, sprites);
        this.prey = new Prey(this, "blue");
        this.hunter = new Hunter(this, "red", this.prey);
        this.controller = new Controller(this.prey);
        
    }

    update(deltaTime) {
        switch (this.gameState) {
            case GAMESTATE.MENU:
                this.time = 0;
                if (this.controller.keyState[' ']) {
                    this.gameState = GAMESTATE.PLAYING;
                    this.board.reset();
                    this.hunter.reset();
                    this.prey.reset();
                }
                break;
            case GAMESTATE.BUILDING:

            case GAMESTATE.PLAYING:
                this.time += deltaTime;
                if (this.hunter.cell.row == this.prey.cell.row) {
                    if (this.hunter.cell.col == this.prey.cell.col) {
                        this.gameState = GAMESTATE.MENU;
                    }
                }
                if (this.prey.cell.row == 0) {
                    if (this.prey.cell.col == 0) {
                        this.gameState = GAMESTATE.WINNING;
                    }
                }
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
            case GAMESTATE.WINNING:
                if (this.controller.keyState[' ']) {
                    console.log(this.time / 1000.0);
                    this.time = 0;
                    this.gameState = GAMESTATE.PLAYING;
                    this.board.reset();
                    this.hunter.reset();
                    this.prey.reset();
                }
        }
        
    }

    draw(context) {
        switch (this.gameState) {
            case GAMESTATE.MENU:
                context.clearRect(0, 0, this.WIDTH, this.HEIGHT);
                context.textAlign = "center";
                context.font = "50px Arial"
                context.fillText(
                    "PRESS SPACEBAR TO PLAY", 
                    400, 
                    400);
                break;
            case GAMESTATE.PLAYING:
                context.clearRect(0, 0, this.WIDTH, this.HEIGHT);
                context.fillStyle = "#d7fbe8";
                context.fillRect(0, 0, this.WIDTH, this.HEIGHT);
                this.board.draw(context);
                this.hunter.draw(context);
                this.prey.draw(context);
                break;
            case GAMESTATE.PAUSED:
                context.textAlign = "center";
                context.font = "75px Arial";
                context.fillStyle = "RED";
                context.fillText(
                    "PAUSED", 
                    this.WIDTH / 2, 
                    this.HEIGHT / 2); 
                break;
            case GAMESTATE.WINNING:
                context.textAlign = "center";
                context.font = "75px Arial";
                context.fillStyle = "#00ff00";
                context.fillText(
                    "YOU WON.", 
                    this.WIDTH / 2, 
                    this.HEIGHT / 2); 
                break;
        }
        
    }
}