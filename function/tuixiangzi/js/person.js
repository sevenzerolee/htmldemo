class Person extends Block {

    constructor(position) {
        super();

        this.position = position || {x: 0, y: 0};

        // zIndex 
        Object.assign(this.el.style, this.privateStyle, {zIndex: 5});
        
        this.direction = "bottom";
        this.el.style.background = `url(./images/player_${this.direction}.png) center/70px 70px`;
        // this.el.style.background = 'url(./images/player_bottom.png) center/70px 70px';

        this.setPosition();
    }

    // 重写父类中的方法
    move(dp) {
        
        // 用于节流，不然事件太多，反应不过来
        if (!this.canMove) {
            return;
        }

        this.changeDirectoion(dp);
        this.walk();
        
        this.canMove = false;
        setTimeout(() => {
            this.el.style.background = `url(./images/player_${this.direction}.png) center/70px 70px`;
            this.canMove = true;
        }, 310);

        // console.log("移动位置", dp);
        this.position.x = this.position.x + dp.x;
        this.position.y = this.position.y + dp.y;
        this.setPosition();
    }

    changeDirectoion(dp) {
        // 判断方向
        if (dp.x === 1) {
            this.direction = "right";
        }
        if (dp.x === -1) {
            this.direction = "left";
        }
        if (dp.y === 1) {
            this.direction = "bottom";
        }
        if (dp.y === -1) {
            this.direction = "top";
        }
        console.log("方向 " + this.direction);
    }

    walk() {
        // 
        let timeStart = new Date();
        let players = {
            "right": ["right_walk", "right_walk"],
            "left": ["left_walk", "left_walk"],
            "top": ["top_walk1", "top_walk2"],
            "bottom": ["bottom_walk1", "bottom_walk2"]
        };
        // players[this.direction][steps%2]
        // let playlist = ["bottom_walk1", "bottom_walk2"];
        // playlist[steps%2]
        let steps = 0;

        function run() {
            steps++;
            this.el.style.background = `url(./images/player_${players[this.direction][steps%2]}.png) center/70px 70px`;
            if (new Date() - timeStart < 290) {
                setTimeout(() => {
                    run.call(this);
                }, 100);
            }
        }

        run.call(this);
    }

}