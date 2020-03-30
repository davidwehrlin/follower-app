import {DynamicObject} from '/src/object.js'

export default class Prey extends DynamicObject {

    constructor(game, c) {
        super(game, c);
        this.reset();
    }

     reset() {
         this.pos.x = this.game.WIDTH - 15;
         this.pos.y = this.game.HEIGHT - 15;
     }
}

