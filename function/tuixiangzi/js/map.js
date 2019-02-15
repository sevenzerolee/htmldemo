class Map {

    constructor(json) {
        this.json = json;
        this.person = new Person(json.person);

        this.createWall();

        this.createBox();

        this.createTarget();

        this.history = new History();
        // 记录第一个位置
        this.history.addRecord(JSON.parse(JSON.stringify(this.json)));

        this.win = false;
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
        return type.some(item => {
            // console.log(item.position);
            return item.position.x === position.x && item.position.y === position.y;
        });
    }

    getBlock(type, position) {
        let temp = null;
        type.some(item => {
            return item.position.x === position.x && item.position.y === position.y && (temp = item);
        });
        console.log(temp.position);
        return temp;
    }

    checkwin() {
        this.win = this.targetList.every(item => {
            return this.hasBlock(this.boxList, item.position);
        });
    }

    move(dp) {
        // 记录 person 当前位置
        let personCurPos = this.person.position;
        // 推的位置：person 当前位置 +1
        let pushPlace = {
            x: personCurPos.x + dp.x,
            y: personCurPos.y + dp.y
        };
        // 箱子将要到达的位置：推的位置 +1
        let boxTarget = {
            x: pushPlace.x + dp.x,
            y: pushPlace.y + dp.y
        };

        // 是否遇到墙
        if (this.hasBlock(this.wallList, pushPlace)) {
            console.log("撞墙了");
            return ;
        }

        // 判断到达的目标位置是否箱子或墙
        let flag = this.hasBlock(this.boxList, boxTarget) || this.hasBlock(this.wallList, boxTarget);

        // 前方是箱子，而且箱子后面为空(箱子后面不是箱子也不是墙)
        if (this.hasBlock(this.boxList, pushPlace) && (!flag) ) {
            // 先得获取到箱子的位置，箱子前进一格，人前进一格
            this.getBlock(this.boxList, pushPlace).move(dp);
            this.person.move(dp);
        }
        // 前方是箱子，而且箱子后面不为空，或者前方为空
        else {
            if (this.hasBlock(this.boxList, pushPlace)) {
                console.log("箱子后面有障碍物不可推动");
                return ;
            }
            else {
                this.person.move(dp);
            }
        }

        this.checkwin();

        // 记录第一个位置
        this.history.addRecord(JSON.parse(JSON.stringify(this.json)));

    }

}