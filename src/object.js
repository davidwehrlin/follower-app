class Object {
    constructor(game) {
        this.game = game;
        this.pos = {
            x: 0,
            y: 0
        }
        this.cell = [0, 0]
    }
}

class StaticObject extends Object{
    constructor(game, sprite) {
        super(game);
        this.sprite = sprite;
    }

    draw(ctx){
        ctx.drawImage(this.sprite, this.pos.x, this.pos.y);
    }
}


class DynamicObject extends Object {
    constructor(game, c) {
        super(game);
        this.c = c;
        this.dPos = {
            x: 0,
            y: 0
        }
        this.speed = 2;
        this.radius = 10; 
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
        this.cell[0] = Math.floor(this.dPos.x / this.game.GRID_SIZE);
        this.cell[1] = Math.floor(this.dPos.y / this.game.GRID_SIZE);
    }
}

export {StaticObject, DynamicObject};