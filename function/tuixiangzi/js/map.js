class Map {

    constructor(json) {
        this.json = json;
        this.person = new Person(json.person);

        this.createWall();

        this.createBox();

        this.createTarget();
    }

    createWall() {
        this.wall = [];
        this.json.wall.forEach(element => {
            this.wall.push(new Wall(element));
        });

        // console.log(this.wall);
    }

    createBox() {
        this.box = [];
        this.json.box.forEach(element => {
            this.box.push(new Box(element));
        });
    }

    createTarget() {
        this.target = [];
        this.json.target.forEach(element => {
            this.target.push(new Target(element));
        });
    }

    addTo(target) {
        this.person.addTo(target);

        this.wall.forEach(v => {
            v.addTo(target);
        });

        this.box.forEach(v => {
            v.addTo(target);
        });

        this.target.forEach(v => {
            v.addTo(target);
        });
    }

}