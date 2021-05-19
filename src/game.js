import { getWallCollition, haveCollision } from "./additional.js";
import { Group } from "./group.js";
import { startPositions } from "./startPosition.js";

export class Game{
    constructor (config = {}) {

        this.positions = startPositions;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.stage = new Group();

        this.canvas.width = config.width || 50;
        this.canvas.height = config.height || 50;
        this.background = config.background || "black";

        this.pTimestamp = 0;
        requestAnimationFrame(x => this.render(x));

        this.startGame(this.positions);
    }

    update() {}

    startGame (posits) {
        posits.forEach((posit) => {
            this.stage.add(posit);
        });
    }

    clearCanvas () {
        this.canvas.width = this.canvas.width;
    }

    drawBackground () {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.background;
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
    }

    render (timestamp) {
        requestAnimationFrame(x => this.render(x));
        let delta = timestamp - this.pTimestamp;
        this.pTimestamp = timestamp;

        this.update();
        this.stage.update(delta);

        this.clearCanvas();
        this.drawBackground();

        this.stage.draw(this.ctx);
    }

    movePacman (event) {
        let pacman = this.positions.find(elem => elem.name === "pacman");
        let foods = this.positions.filter(elem => elem.name === "food");
        let walls = this.positions.filter(elem => elem.name === "wall");

        this.update = () => {
            let eated = [];
            foods.forEach(food => {
                if (haveCollision(pacman, food)) {
                    eated.push(food);
                    this.stage.remove(food);
                }
            });
            foods = foods.filter(food => !eated.includes(food));

            pacman.changeDirection(walls);

            if (getWallCollition(pacman.getNextPosition(), walls)) {
                pacman.speedX = 0;
                pacman.speedY = 0;
            }
        }

        switch (event.key) {
            case "ArrowLeft" :
                pacman.nextDirection = "left";
                break;
            case "ArrowRight" :
                pacman.nextDirection = "right";
                break;
            case "ArrowUp" :
                pacman.nextDirection = "up";
                break;
            case "ArrowDown" :
                pacman.nextDirection = "down";
                break;
        }
    }
}