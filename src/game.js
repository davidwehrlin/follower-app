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
    constructor (canvas, sprites) {
        this.canvas = canvas
        this.context = canvas.getContext("2d");
        if (window.innerHeight > window.innerWidth) {
            canvas.width = 0.9 * window.innerWidth;
        canvas.height = 0.9 * window.innerWidth;
        } else {
            canvas.width = 0.4 * window.innerWidth;
            canvas.height = 0.4 * window.innerWidth;
        }
        
        this.WIDTH = canvas.width;
        this.HEIGHT = canvas.height; 
        this.sprites = sprites;
        this.gridLen = 16; //# of grid squares
        this.GRID_SIZE = this.WIDTH / this.gridLen; //pixel size for a grid square
        this.gameState = GAMESTATE.MENU;
        this.time = 0
        
        this.board = new Board(this, sprites);
        this.prey = new Prey(this, "blue");
        this.hunter = new Hunter(this, "red", this.prey);
        this.controller = new Controller(this.prey);
        
    }

    resize(WIDTH, HEIGHT) {
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.GRID_SIZE = WIDTH / this.gridLen;
        this.context = this.canvas.getContext("2d");
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
            case GAMESTATE.PLAYING:
                this.time += deltaTime;
                //Hunter cell == player cell so you lose
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


    draw() {
        let fsz = Math.ceil(this.GRID_SIZE * 1.5);
        switch (this.gameState) {
            case GAMESTATE.MENU:
                this.context.clearRect(0, 0, this.WIDTH, this.HEIGHT);
                this.context.fillStyle = "white";
                this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);
                this.context.fillStyle = "black"
                this.context.textAlign = "center";
                
                this.context.font = fsz.toString() + "px Impact"
                this.context.fillText(
                    "PRESS SPACEBAR TO PLAY", 
                    this.HEIGHT / 2, 
                    this.WIDTH / 2);
                break;
            case GAMESTATE.PLAYING:
                this.context.clearRect(0, 0, this.WIDTH, this.HEIGHT);
                this.context.fillStyle = "white";
                this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);
                this.board.draw(this.context);
                this.hunter.draw(this.context);
                this.prey.draw(this.context);
                break;
            case GAMESTATE.PAUSED:
                this.context.textAlign = "center";
                
                this.context.font = fsz.toString() + "px Impact"
                this.context.fillStyle = "RED";
                this.context.fillText(
                    "PAUSED", 
                    this.WIDTH / 2, 
                    this.HEIGHT / 2); 
                break;
            case GAMESTATE.WINNING:
                this.context.textAlign = "center";
                this.context.font = fsz.toString() + "px Impact"
                this.context.fillStyle = "#00ff00";
                this.context.fillText(
                    "YOU WON!", 
                    this.WIDTH / 2, 
                    this.HEIGHT / 2); 
                break;
        }
        
    }
}