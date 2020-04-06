import {DynamicObject} from '/src/object.js';
import Physics from "/src/physics.js";

export default class Prey extends DynamicObject {

    constructor(game, c) {
        super(game, c);
        this.reset();
    }

    reset() {
        this.pos = {
            x: this.game.WIDTH - this.game.GRID_SIZE / 2,
            y: this.game.HEIGHT - this.game.GRID_SIZE / 2
        }

        this.cell = {
            row: this.game.WIDTH / this.game.GRID_SIZE,
            col: this.game.WIDTH / this.game.GRID_SIZE
        }
    }

    move(direction) {
        switch(direction) {
            case "up":
                this.dPos.y -= this.speed;
                break;
            case "left":
                this.dPos.x -= this.speed;
                break;
            case "down":
                this.dPos.y += this.speed;
                break;
            case "right":
                this.dPos.x += this.speed;
                break;
        }
    }

    update(deltaTime, controller) {
        super.update(deltaTime);
        if (controller.keyState['w']) this.move("up");
        if (controller.keyState['a']) this.move("left");
        if (controller.keyState['s']) this.move("down");
        if (controller.keyState['d']) this.move("right");
        let correction = Physics.checkCollision(this.game, this.game.board, this);
        Physics.handleCollision(this, correction);
     }
}

