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
            e.preventDefault();
            if (e.ctrlKey && e.code) {
                
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
    }

    // 通关显示
    stage3() {
        this.gamearea.style.background = 'url("https://img.zcool.cn/community/01493157e33c4a0000018c1bbc830b.jpg") center/cover';
        this.gamearea.innerHTML = "You Win !";
        this.gamearea.style.textAlign = 'center';
        this.gamearea.style.fontSize = '28px';
        this.gamearea.style.lineHeight = '560px';
    }

}