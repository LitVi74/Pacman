import { Group } from "./group.js";

export class Game{
    constructor (config = {}) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.stage = new Group();

        this.canvas.width = config.width || 50;
        this.canvas.height = config.height || 50;
        this.background = config.background || "black";

        this.pTimestamp = 0;
        requestAnimationFrame(x => this.render(x));
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

        this.stage.update(delta);

        this.clearCanvas();
        this.drawBackground();

        this.stage.draw(this.ctx);
    }
}