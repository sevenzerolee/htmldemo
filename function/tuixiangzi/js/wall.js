class Wall extends Block {

    constructor(position) {
        super();

        this.position = position || {x: 0, y: 0};

        Object.assign(this.el.style, this.privateStyle);
        this.el.style.background = 'url(./images/wall.png) center/70px 70px';
        this.setPosition();
    }

}