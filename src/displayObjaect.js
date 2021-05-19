export class DisplayObject {
    constructor (config = {}) {
        this.visible = config.visible || true;

        this.name = config.name;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.width = config.width || 0;
        this.height = config.height || 0;
        this.debug = config.debug || false;
    }

    update () {
        
    }

    draw (ctx) {
        if (this.debug) {
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fill();

            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx. lineWidth = 3;
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y + this.height);
            ctx.stroke();
        }
    }
}