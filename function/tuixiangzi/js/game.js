class Game {

    constructor(selector) {
        this.gamearea = document.querySelector(selector);
        this.init();

        this.map = new Map(mapdata);
        this.map.addTo(this.gamearea);
        this.person = this.map.person;

        // 可以全处理为小写字母
        this.keys = {
            ArrowUp: {x: 0, y: -1},
            ArrowDown: {x: 0, y: 1},
            ArrowLeft: {x: -1, y: 0},
            ArrowRight: {x: 1, y: 0}
        };
        this.register();
    }

    init() {
        this.gamearea.style.background = 'url(./images/land.png) center/70px 70px';
    }

    register() {
        window.addEventListener("keydown", (e) => {
            // console.log(e, e.key, this.keys[e.key]);
            let dp = this.keys[e.key];
            if (dp) {
                this.person.move(dp);
            }
        });
    }

}