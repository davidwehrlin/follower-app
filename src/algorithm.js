import {MOVE} from "/src/hunter.js"

function getNextCells(grid, hunter) {
    let ans = [];
    let len = Math.sqrt(grid.length);
    let index = hunter.cell.row * len + hunter.cell.col;
    let cell = grid[index];
    if (!cell.walls.n) {
        ans.push(grid[(hunter.cell.row - 1) * len + hunter.cell.col])
    }
    if (!cell.walls.e) {
        ans.push(grid[hunter.cell.row * len + hunter.cell.col + 1])
    }
    if (!cell.walls.s) {
        ans.push(grid[(hunter.cell.row + 1) * len + hunter.cell.col])
    }
    if (!cell.walls.w) {
        ans.push(grid[(hunter.cell.row) * len + hunter.cell.col - 1])
    }
    return ans
}

export function randomSearch(grid, hunter) {
    let cells = getNextCells(grid, hunter);
    return cells[Math.floor(Math.random() * cells.length)];
}

export function greedySearch(grid, hunter, minHeap) {
    let cells = getNextCells(grid, hunter);
    cells.forEach((cell) => {
        if (cell.visited == false) {
            minHeap.push({cell: cell, value: hunter.prey.scent(cell.row, cell.col)})
            cell.visited = true;
        }
    })
    return minHeap.pop().cell;
}

export function aStarSearch(grid, hunter, stack) {
    let cells = getNextCells(grid, hunter);
}

export function breadthFirstSearch(grid, hunter) {
    let cells = getNextCells(grid, hunter);
}

export function depthFirstSearch(grid, hunter) {
    let cells = getNextCells(grid, hunter);
}

