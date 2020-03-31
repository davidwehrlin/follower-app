export default class Controller {
    constructor (game) {
        this.game = game;
        this.keyState = {
            'w': false,
            'a': false,
            's': false,
            'd': false,
            ' ': false,
            'Escape': false
        };

        document.addEventListener("keydown", (event) => {
            this.keyState[event.key] = true;
        });

        document.addEventListener("keyup", (event) => {
            this.keyState[event.key] = false;
        });
    }
}