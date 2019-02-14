class Map {

    constructor(json) {
        this.json = json;
        this.person = new Person(json.person);

        this.createWall();

        this.createBox();

        this.createTarget();
    }

    createWall() {
        this.wallList = [];
        this.json.wall.forEach(element => {
            this.wallList.push(new Wall(element));
        });

        // console.log(this.wall);
    }

    createBox() {
        this.boxList = [];
        this.json.box.forEach(element => {
            this.boxList.push(new Box(element));
        });
    }

    createTarget() {
        this.targetList = [];
        this.json.target.forEach(element => {
            this.targetList.push(new Target(element));
        });
    }

    addTo(target) {
        this.person.addTo(target);

        this.wallList.forEach(v => {
            v.addTo(target);
        });

        this.boxList.forEach(v => {
            v.addTo(target);
        });

        this.targetList.forEach(v => {
            v.addTo(target);
        });
    }

    hasBlock(type, position) {
        return type.some(item => item.position.x === position.x && item.position.y === position.y);
    }

    move(dp) {
        // 记录 person 当前位置
        let personCurPos = this.person.position;
        // 推的位置
        let pushPlace = {
            x: personCurPos.x + dp.x,
            y: personCurPos.y + dp.y
        };
        // 箱子将要到达的位置
        let boxTarget = {
            x: pushPlace.x + dp.x,
            y: pushPlace.y + dp.y
        };

        // 是否遇到墙
        if (this.hasBlock(this.wallList, pushPlace)) {
            console.log("撞墙了");
            return ;
        }

        this.person.move(dp);
    }

}