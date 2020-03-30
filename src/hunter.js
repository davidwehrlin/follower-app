import {DynamicObject} from '/src/object.js'

export default class Hunter extends DynamicObject {
    constructor(game, c) {
        super(game, c);
        this.reset();
        this.scent = {
            x: 0,
            y: 0
        }
    }

    track(prey) {

    }

    pursue(prey) {
        this.scent.x = prey.pos.x - this.pos.x;
        this.scent.y = prey.pos.y - this.pos.y;
        if (this.scent.x > 0 && this.scent.y > 0){
            this.move("down");
            this.move("right");
        } else if (this.scent.x > 0 && this.scent.y <= 0){
            this.move("up");
            this.move("right");
        } else if (this.scent.x <= 0 && this.scent.y > 0){
            this.move("down");
            this.move("left");
        } else if (this.scent.x <= 0 && this.scent.y <= 0){
            this.move("up");
            this.move("left");
        }

    }

    reset() {
        this.pos.x = 15;
        this.pos.y = 15;
    }

}

