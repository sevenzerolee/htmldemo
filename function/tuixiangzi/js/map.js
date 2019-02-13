class Map {

    constructor(json) {
        this.json = json;
        this.person = new Person(json.person);
    }

    createWall() {
        this.wall = [];
        this.json.wall.forEach(element => {
            this.wall.push(new Wall(element));
        });
    }

    addTo(target) {
        this.person.addTo(target);
    }

}