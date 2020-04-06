class Vector2d {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.mag = Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
    }

    projection(vector) {
        let unitVec = vector.unitVector();
        return ((this.x * unitVec.x) + (this.y * unitVec.y)) / vector.mag;
    }

    unitVector() {
        return new Vector2d((this.x / this.mag),(this.y / this.mag));
    }
}

class LineSegment {
    constructor(A,B) {
        this.start = A;
        this.end = B;
        let x = this.start[0]-this.end[0];
        let y = this.start[1]-this.end[1];
        this.length = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
    }

    toVector(isReversed){
        if(isReversed == true) {
            return new Vector2d(this.start[0]-this.end[0], this.start[1]-this.end[1]);
        } else {
            return new Vector2d(this.end[0]-this.start[0], this.end[1]-this.start[1]);
        }
    }

    getSlope() {
        if ((this.end[0] - this.start[0]) == 0) {
            return null
        } else {
            return (this.end[1]-this.start[1]) / (this.end[0]-this.start[1]);
        }
    }
}

class Sphere {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
}

export default class Physics {
    static checkLineSphereCollision(line, sphere) {
        let AB = new LineSegment(line.start, [sphere.x, sphere.y]);
        let vAB = AB.toVector(false);
        let vAC = line.toVector(false);
        let proj = vAB.projection(vAC);
        let vAD = new Vector2d(vAC.x * proj, vAC.y * proj);
        if (proj >= 0) {
            let dist = Math.sqrt(Math.pow(vAB.mag,2) - Math.pow(vAD.mag,2));
            if (dist < sphere.r) {
                let DB = new Vector2d(vAB.x - vAD.x, vAB.y - vAD.y);
                let coef = 1 - (dist / sphere.r);
                return [coef * DB.x, coef * DB.y];
            } else {
                
                return [0,0];
            }
        } else {
            if (vAB.mag < sphere.r) {
                return [vAD.x, vAD.y];
            } else {
                return [0,0];
            }
            
        }
    }

    static checkCollision(game, board, object) {
        let cell = board.grid[object.cell.row * board.gridLen + object.cell.col];
        if (cell == undefined){
            console.log("Broke");
        } 
        let neighbors = cell.getNeighbors(board);
        let lines = [];
        let cCorns = cell.getCorners(board);
        if (cell.walls.n) lines.push(new LineSegment(cCorns[0], cCorns[1]));
        if (cell.walls.e) lines.push(new LineSegment(cCorns[1], cCorns[2]));
        if (cell.walls.s) lines.push(new LineSegment(cCorns[3], cCorns[2]));
        if (cell.walls.w) lines.push(new LineSegment(cCorns[0], cCorns[3]));
        for (let i = 0; i < neighbors.length; i++) {
            let n = neighbors[i]
            let corners = n.cell.getCorners(board);
            switch (n.direction) { 
                case "north":
                    if (n.cell.walls.e) {
                        lines.push(new LineSegment(corners[2], corners[1]));
                    }
                    if (n.cell.walls.w) {
                        lines.push(new LineSegment(corners[3], corners[0]));
                    }
                    break;
                case "east":
                    if (n.cell.walls.n) {
                        lines.push(new LineSegment(corners[0], corners[1]));
                    }
                    if (n.cell.walls.s) {
                        lines.push(new LineSegment(corners[3], corners[2]));
                    }
                    break;
                case "south":
                    if (n.cell.walls.e) {
                        lines.push(new LineSegment(corners[1], corners[2]));
                    }
                    if (n.cell.walls.w) {
                        lines.push(new LineSegment(corners[0], corners[3]));
                    }
                    break;
                case "west":
                    if (n.cell.walls.n) {
                        lines.push(new LineSegment(corners[1], corners[0]));
                    }
                    if (n.cell.walls.s) {
                        lines.push(new LineSegment(corners[2], corners[3]));
                    }
                    break;
            }
        }
        
        
        let sphere = new Sphere(object.pos.x, object.pos.y, object.radius);
        let ans = [0,0];
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let dPos = this.checkLineSphereCollision(line, sphere);
            ans[0] += dPos[0];
            ans[1] += dPos[1];
        }
        return ans;
    }

    static handleCollision(object, correction) {
        
        object.pos.x += correction[0];
        object.pos.y += correction[1];
    }
}