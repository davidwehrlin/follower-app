export default class Controller {
    constructor (dynObj) {
        this.dynObj = dynObj;
        this.keyState = {
            'w': false,
            'a': false,
            's': false,
            'd': false
        };

        document.addEventListener("keydown", (event) => {
            this.keyState[event.key] = true;
        });

        document.addEventListener("keyup", (event) => {
            this.keyState[event.key] = false;
        });
    }
        

    update(){
        if (this.keyState['w']) this.dynObj.move("up");
        if (this.keyState['a']) this.dynObj.move("left");
        if (this.keyState['s']) this.dynObj.move("down");
        if (this.keyState['d']) this.dynObj.move("right");
    }

}