import {DynamicObject} from '/src/object.js'

export default class Prey extends DynamicObject {

    constructor(game, c) {
        super(game, c);
        this.reset();
    }

    reset() {
        this.pos.x = this.game.WIDTH - 12.5;
        this.pos.y = this.game.HEIGHT - 12.5;
    }

    update(deltaTime, controller) {
        super.update(deltaTime);
        if (controller.keyState['w']) this.move("up");
        if (controller.keyState['a']) this.move("left");
        if (controller.keyState['s']) this.move("down");
        if (controller.keyState['d']) this.move("right");
     }
}

