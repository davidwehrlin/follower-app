import {DynamicObject} from '/src/object.js'


export const SEARCH = {
    GREEDY: 0,
    ASTAR:3,
    NET: 4
}
export default class Hunter extends DynamicObject {
    constructor(game, c) {
        super(game, c);
        this.reset();
        this.scent = 0;
        this.algorithm = SEARCH.GREEDY;
    }

    reset() {
        this.pos = {
            x: 12.5,
            y: 12.5
        };
    }

    move(cell) {
        this.pos.x = cell[0] * this.game.GRID_SIZE + this.game.GRID_SIZE / 2;
        this.pos.y = cell[1] * this.game.GRID_SIZE + this.game.GRID_SIZE / 2;
    }

    smell(prey) {
        this.scent = Math.abs(prey.pos.x - this.pos.x);
        this.scent += + Math.abs(prey.pos.y - this.pos.y);
        return this.scent
    }

    search() {
        console.log("SEARCHING");
        return [Math.floor(Math.random() * 32), Math.floor(Math.random() * 32)];
    }

    update(deltaTime, prey) {
        super.update(deltaTime);
        this.smell(prey);
        let nextCell = this.search();
        this.move(nextCell);
    }
}

