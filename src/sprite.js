import { DisplayObject } from "./displayObjaect.js";

export class Sprite extends DisplayObject{
    constructor (config = {}) {
        super(config);

        this.img = config.img || null;
        this.frame = config.frame || null;

        this.speedX = config.speedX || 0;
        this.speedY = config.speedY || 0;
    }

    getNextPosition () {
        return {
            x: this.x + this.speedX,
            y: this.y + this.speedY,
            width: this.width,
            height: this.height,
        }
    }

    update () {
        this.x += this.speedX;
        this.y += this.speedY
    }

    draw (ctx) {
        if (this.frame){
            ctx.drawImage(
                this.img,
                
                this.frame.x,
                this.frame.y,
                this.frame.width,
                this.frame.height,
                
                this.x,
                this.y,
                this.width,
                this.height
            )
    
            super.draw(ctx);
        }
    }
}