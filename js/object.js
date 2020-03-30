class Object {
    constructor(x, y, c) {
        this.pos = {
            x: x,
            y: y
        }
        this.c = c;
    }
}

class StaticObject extends Object{
    constructor(x, y, c, w, h) {
        super(x,y,c);
        this.w = w;
        this.h = h;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.pos.x, this.pos.y, this.w, this.h);
        ctx.fillStyle = this.c;
        ctx.fill();
    }
}

class DynamicObject extends Object {
    constructor(x, y, c, r) {
        super(x,y,c);
        this.r = r;
        this.dPos = {
            x: 0,
            y: 0
        }
        this.speed = 5;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
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
        if (!deltaTime) return;
        this.pos.x += this.dPos.x;
        this.pos.y += this.dPos.y;
        this.dPos = {
            x: 0,
            y: 0
        }
    }
}

export {StaticObject, DynamicObject};