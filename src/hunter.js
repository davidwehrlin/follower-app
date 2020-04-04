import {DynamicObject} from '/src/object.js'


export const SEARCH = {
    GREEDY: 0,
    ASTAR: 1,
    NET: 2
}

const STATE = {
    SEARCHING: 0,
    MOVING: 1,
    WAITING: 2
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
            x: 25,
            y: 25
        };
        this.cell = {
            row: 0,
            col: 0
        }
    }

    move(cell) {
        this.pos.x = cell[0] * this.game.GRID_SIZE + this.game.GRID_SIZE / 2;
        this.pos.y = cell[1] * this.game.GRID_SIZE + this.game.GRID_SIZE / 2;
    }

    smell(prey) {
        this.scent = Math.abs(prey.pos.x - this.pos.x); 
        this.scent += Math.abs(prey.pos.y - this.pos.y);
        return this.scent
    }

    search(board) {
        return [0, 0];
    }

    update(deltaTime, prey) {
        super.update(deltaTime);
        this.smell(prey);
        let nextCell = this.search(this.game.board);
        this.move(nextCell);
    }
}

