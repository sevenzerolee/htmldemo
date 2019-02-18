class Game {

    constructor(selector) {
        this.gamearea = document.querySelector(selector);
        this.gamearea.style.background = 'url(./images/land.png) center/70px 70px';

        // this.map = new Map(maplist[0]);
        // this.map.addTo(this.gamearea);
        // this.person = this.map.person;

        // 按键的移动
        // 可以全处理为小写字母
        this.keys = {
            ArrowUp: {x: 0, y: -1},
            ArrowDown: {x: 0, y: 1},
            ArrowLeft: {x: -1, y: 0},
            ArrowRight: {x: 1, y: 0}
        };
        // this.register();

        this.stage2(0);
        // this.stage4();
        // this.stage3();
    }

    register() {
        // 移动
        window.addEventListener("keydown", (e) => {
            // console.log(e, e.key, this.keys[e.key]);
            let dp = this.keys[e.key];
            if (dp) {
                // this.person.move(dp);
                this.map.move(dp);
                this.history.addRecord(this.map);

                // 判断是否完成，并切换场景
                if (this.map.win) {
                    console.log("you win .");
                    setTimeout(() => {
                        this.stage3();
                    }, 500);
                }
            }
        });

        // 撤销
        window.addEventListener("keydown", (e) => {
            console.log(e);
            // ctrl+z
            e.preventDefault(); // 这里可能会禁用其他快捷键
            if (e.ctrlKey && e.code === "KeyZ") {
                this.history.ctrlZ();

                let json = this.history.getHistory();
                this.map.render(json);
            }
        });

    }

    // 选择关卡
    stage1() {

    }

    // 游戏主体
    stage2(level = 0) {
        this.gamearea.innerHTML = "";

        this.map = new Map(maplist[level]);
        this.map.addTo(this.gamearea);
        this.person = this.map.person;

        this.register();

        // 记录历史操作
        this.history = new History();
        // 记录初始状态
        this.history.addRecord(this.map);
    }

    // 通关显示
    stage3() {
        this.gamearea.style.background = 'url("https://img.zcool.cn/community/01493157e33c4a0000018c1bbc830b.jpg") center/cover';
        this.gamearea.innerHTML = "You Win !";
        this.gamearea.style.textAlign = 'center';
        this.gamearea.style.fontSize = '28px';
        this.gamearea.style.lineHeight = '560px';
    }

    // 编辑地图
    stage4() {
        this.editMap();
    }

    editMap() {
        this.editType = "wall";
        this.mapJson = {
            name: "设计地图",
            person: {x: 2, y: 3},
            wall: [],
            box: [],
            target: []
        };

        this.map = new Map(this.mapJson);
        this.map.addTo(this.gamearea);

        this.gamearea.addEventListener("click", (e) => {
            if (e.target.id !== "main") {
                console.log("不在范围内");
                return ;
            }
            console.log(e.offsetX + ", " + e.offsetY);
            let position = {
                x: Math.floor(e.offsetX/70),
                y: Math.floor(e.offsetY/70)
            };
            console.log(position);
            this.mapJson[this.editType].push(position);
            this.map = new Map(this.mapJson);
            this.map.addTo(this.gamearea);

        });
    }

    modifyMapType(type) {
        this.editType = type;
        console.log(this.editType);
    }

    // 地图数据转为 json 输出
    saveMap() {
        console.log(this.mapJson);
        // 转为 json
        console.log((JSON.stringify(this.mapJson)));
    }

}