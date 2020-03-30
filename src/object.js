class Object {
    constructor(game) {
        this.game = game;
        this.pos = {
            x: 0,
            y: 0
        }
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


const radius = 15;
class DynamicObject extends Object {
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

    move(direction) {
        switch(direction) {
            case "up":
                this.dPos.y -= this.speed;
                break;
            case "left":
                this.dPos.x -= this.speed;
                break;
            case "down":
                this.dPos.y += this.speed;
                break;
            case "right":
                this.dPos.x += this.speed;
                break;
        }
    }

    update(deltaTime){
        this.pos.x += this.dPos.x;
        this.pos.y += this.dPos.y;
        this.dPos = {
            x: 0,
            y: 0
        }
    }
}

export {StaticObject, DynamicObject};