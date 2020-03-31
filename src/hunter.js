import {DynamicObject} from '/src/object.js'


export const SEARCH = {
    GREEDY: 0,
    BFS: 1,
    DFS: 2,
    ASTAR:3,
    NET: 4
}
export default class Hunter extends DynamicObject {
    constructor(game, c) {
        super(game, c);
        this.reset();
        this.scent = 0;
        this.algorithm = SEARCH.GREEDY;
        this.queue = new TinyQueue([], (a, b) => {
            a.val - b.val;
        });
    }

    reset() {
        this.pos = {
            x: 12.5,
            y: 12.5
        };
    }

    smell(prey) {
        this.scent = (
            Math.abs(prey.pos.x - this.pos.x) +
            Math.abs(prey.pos.y - this.pos.y)
        )
    }

    
    search() {
        switch (this.algorithm) {
            case SEARCH.GREEDY:
                
                this.queue.push({key: this.cell, value: this.scent});

                break;
        }
    }

    chase() {

    }

    

    update(deltaTime, prey) {
        super.update(deltaTime);
        this.smell(prey);
        //this.search();
        this.chase();
    }
}

