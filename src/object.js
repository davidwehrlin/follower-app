class Thing {
    constructor(game) {
        this.game = game;
        this.pos = {
            x: 0,
            y: 0
        }
        this.cell = this.game.board.grid[0];
    }
}

class StaticObject extends Thing{
    constructor(game, sprite) {
        super(game);
        this.sprite = sprite;
    }

    draw(ctx, cell){
        this.pos.x = cell.col * this.game.GRID_SIZE;
        this.pos.y = cell.row * this.game.GRID_SIZE;
        ctx.drawImage(
            this.sprite, 
            this.pos.x + 5, 
            this.pos.y + 5, 
            this.game.GRID_SIZE - 10, 
            this.game.GRID_SIZE - 10);
    }
}


class DynamicObject extends Thing {
    constructor(game, c) {
        super(game);
        this.c = c;
        this.dPos = {
            x: 0,
            y: 0
        }
        this.speed = 2;
        this.radius = 15;   
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.c;
        ctx.fill();
    }

    

    update(deltaTime){
        this.pos.x += this.dPos.x;
        this.pos.y += this.dPos.y;
        this.dPos = {
            x: 0,
            y: 0
        }
        if (this.pos.x > this.game.WIDTH) this.pos.x = this.game.WIDTH;
        if (this.pos.y > this.game.HEIGHT) this.pos.y = this.game.HEIGHT;
        if (this.pos.x < 0) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = 0;

        this.cell.col = Math.floor(this.pos.x / this.game.GRID_SIZE);
        this.cell.row = Math.floor(this.pos.y / this.game.GRID_SIZE);
        if (this.cell.col > 15) this.cell.col = 15;
        if (this.cell.row > 15) this.cell.row = 15;
        if (this.cell.col < 0) this.cell.col = 0;
        if (this.cell.row < 0) this.cell.row = 0;
    }
}

export {StaticObject, DynamicObject};