import {DynamicObject} from '/src/object.js'


export const SEARCH = {
    RANDOM: 0,
    GREEDY: 1,
    ASTAR: 2,
    NET: 3
}

export const MOVE = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
}

export default class Hunter extends DynamicObject {
    constructor(game, c) {
        super(game, c);
        this.reset();
        this.scent = 0;
        this.algorithm = SEARCH.RANDOM;
        this.time = 0;
    }

    reset() {
        this.pos = {
            x: 25,
            y: 25
        };
        this.cell = this.game.board.grid[0];
    }

    move(movement) {
        switch (movement) {
            case MOVE.UP:
                this.pos.y -= game.GRID_SIZE;
                break;
            case MOVE.DOWN:
                this.pos.y += game.GRID_SIZE;
                break;
            case MOVE.LEFT:
                this.pos.x -= game.GRID_SIZE;
                break;
            case MOVE.RIGHT:
                this.pos.x += game.GRID_SIZE;
                break;
        }
    }

    smell(prey) {
        this.scent = Math.abs(prey.pos.x - this.pos.x); 
        this.scent += Math.abs(prey.pos.y - this.pos.y);
        return this.scent
    }

    search(deltaTime, board) {
        switch(this.algorithm) {
            case SEARCH.RANDOM:
                
                break;
            case SEARCH.GREEDY:
                break;
            case SEARCH.ASTAR:
                break;
            case SEARCH.NET:
                break;
        }
        return [0, 0];
    }

    update(deltaTime, prey) {
        super.update(deltaTime);
        this.time += deltaTime;
        this.smell(prey);
        if (this.time > this.speed) {
            this.time = 0;
            let nextCell = this.search(deltaTime, this.game.board);
            this.move(nextCell);
        }
        
        
        
    }
}

