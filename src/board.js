import { StaticObject } from "/src/object.js";

const spritePercent = 0.15;
class Cell {
    constructor(i, j) {
        this.row = i;
        this.col = j;
        this.object = null;
        this.walls = {
            e: true,
            n: true,
            w: true,
            s: true
        }
    }

    getCorners(board) {
        let ans = [];
        let origin = [this.col * board.grdsz, this.row * board.grdsz];
        ans.push(origin);
        ans.push([origin[0] + board.grdsz, origin[1]]);
        ans.push([origin[0] + board.grdsz, origin[1] + board.grdsz]);
        ans.push([origin[0], origin[1] + board.grdsz]);
        return ans;
    }

    getNeighbors(board) {
        let ans = [];
        //calculations for array bounds
        let east = (this.col + 1) * board.gridLen + this.row;
        let north = (this.row - 1) * board.gridLen + this.col;
        let west = (this.col - 1) * board.gridLen + this.row;
        let south = (this.row + 1) * board.gridLen + this.col;
        
        if (north >= 0) {
            ans.push({direction: "north", cell: board.grid[north]});
        }
        if (south < Math.pow(board.gridLen, 2)) {
            ans.push({direction: "south", cell: board.grid[south]});
        } 
        if (east < Math.pow(board.gridLen, 2)) {
            east = this.row * board.gridLen + this.col + 1;
            ans.push({direction: "east", cell: board.grid[east]});
        }
        if (west >= 0) {
            west = this.row * board.gridLen + this.col - 1;
            ans.push({direction: "west", cell: board.grid[west]});
        }
        //shuffle
        for (let i = ans.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [ans[i], ans[j]] = [ans[j], ans[i]];
        }
        return ans;
    }

    handleNeighbor(game, neighbor) {
        switch (neighbor.direction) {
            case "north":
                this.walls.n = false;
                neighbor.cell.walls.s = false;
                break;
            case "south":
                this.walls.s = false;
                neighbor.cell.walls.n = false;
                break;
            case "east": 
                this.walls.e = false;
                neighbor.cell.walls.w = false;
                break;
            case "west":
                this.walls.w = false;
                neighbor.cell.walls.e = false;
                break;
        }

        if (Math.random() < spritePercent) {
            let sprite = game.sprites[1];
            neighbor.cell.object = new StaticObject(game, sprite)
        }
    }
}

export default class Board {
    constructor(game) {
        this.game = game;
        this.gridLen = game.WIDTH / game.GRID_SIZE;
        this.grdsz = game.GRID_SIZE;
        this.grid = [];
        this.reset();
    }
    reset() {
        this.grid = [];
        for (let i = 0; i < this.gridLen; i++) {
            for (let j = 0; j < this.gridLen; j++) {
                this.grid.push(new Cell(i, j));
            }
        }
        this.generateMaze();
    }

    generateMaze() {
        let stack = [this.grid[0]];
        let visited = [stack[0]];
        while (stack.length > 0) {
            let v = stack.pop();
            let neighbors = v.getNeighbors(this);
            for (let i = 0; i < neighbors.length; i++) {
                let n = neighbors[i];
                if (visited.includes(n.cell) == false) {
                    stack.push(n.cell);
                    visited.push(n.cell);
                    v.handleNeighbor(this.game, n);
                }
            }
        }
        this.grid[this.grid.length - 1].object = null;
    }

    draw(ctx) {
        let grdsz = this.game.GRID_SIZE;
        ctx.strokeStyle = "#013220";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        for (let i = 0; i < this.grid.length; i++) {
            let cell = this.grid[i];
            if (cell.walls.n) {
                ctx.beginPath()
                ctx.moveTo(cell.col * grdsz, cell.row * grdsz);
                ctx.lineTo(cell.col * grdsz + grdsz, cell.row * grdsz);
                ctx.stroke();
            }
            if (cell.walls.e) {
                ctx.beginPath()
                ctx.moveTo(cell.col * grdsz + grdsz, cell.row * grdsz + grdsz);
                ctx.lineTo(cell.col * grdsz + grdsz, cell.row * grdsz);
                ctx.stroke();
            }
            if (cell.walls.s) {
                ctx.beginPath()
                ctx.moveTo(cell.col * grdsz + grdsz, cell.row * grdsz + grdsz);
                ctx.lineTo(cell.col * grdsz, cell.row * grdsz + grdsz);
                ctx.stroke();
            }
            if (cell.walls.w) {
                ctx.beginPath()
                ctx.moveTo(cell.col * grdsz, cell.row * grdsz);
                ctx.lineTo(cell.col * grdsz, cell.row * grdsz + grdsz);
                ctx.stroke();
            }
            if (cell.object != null) cell.object.draw(ctx, cell);
        }
    }
}