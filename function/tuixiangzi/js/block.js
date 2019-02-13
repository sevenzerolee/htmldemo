class Block {

    constructor() {
        this.el = document.createElement("div");
        this.privateStyle = {
            position: "absolute",
            width: "70px",
            height: "70px",
            backgroundColor: "gray"
        };
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


}