class Block {

    constructor() {
        this.el = document.createElement("div");
        this.privateStyle = {
            position: "absolute",
            width: "70px",
            height: "70px",
            backgroundColor: "gray"
        };

        // 用于节流，不然事件太多，反应不过来
        this.canMove = true;
    }

    setPosition(position) {
        if (position) {
            this.position = position;
        }

        this.el.style.left = this.position.x * 70 + "px";
        this.el.style.top  = this.position.y * 70 + "px";
    }

    addTo(target) {
        target.appendChild(this.el);
    }

    move(dp) {
        // 用于节流，不然事件太多，反应不过来
        if (!this.canMove) {
            return;
        }
        this.canMove = false;
        setTimeout(() => {
            this.canMove = true;
        }, 300);
        console.log("移动位置", dp);
        this.position.x = this.position.x + dp.x;
        this.position.y = this.position.y + dp.y;
        this.setPosition(this.position);
    }

}