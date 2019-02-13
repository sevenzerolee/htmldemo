class Game {

    constructor(selector) {
        this.gamearea = document.querySelector(selector);

        this.map = new Map(mapdata);
        this.map.addTo(this.gamearea);

        this.init();
    }

    init() {
        this.gamearea.style.background = 'url(./images/land.png) center/70px 70px';
    }

}