class Object {
    constructor(x, y, c) {
        this.x = x;
        this.y = y;
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
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = this.c;
        ctx.fill();
    }
}

class DynamicObject extends Object {
    constructor(x, y, c, r) {
        super(x,y,c);
        this.r = r;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.c;
        ctx.fill();
    }
}

export {StaticObject, DynamicObject};