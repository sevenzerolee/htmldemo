class Game {

    constructor(selector) {
        this.gamearea = document.querySelector(selector);
        this.gamearea.style.background = 'url(./images/land.png) center/70px 70px';

        this.map = new Map(maplist[0]);
        this.map.addTo(this.gamearea);
        this.person = this.map.person;

        // 按键的移动
        // 可以全处理为小写字母
        this.keys = {
            ArrowUp: {x: 0, y: -1},
            ArrowDown: {x: 0, y: 1},
            ArrowLeft: {x: -1, y: 0},
            ArrowRight: {x: 1, y: 0}
        };
        this.register();
    }

    register() {
        window.addEventListener("keydown", (e) => {
            // console.log(e, e.key, this.keys[e.key]);
            let dp = this.keys[e.key];
            if (dp) {
                // this.person.move(dp);
                this.map.move(dp);
            }
        });
    }

}