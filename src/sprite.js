import { DisplayObject } from "./displayObjaect.js";

export class Sprite extends DisplayObject{
    constructor (config = {}) {
        super(config);

        this.img = config.img || null;
        this.frame = config.frame || null;
    }

    update () {
        
    }

    draw (ctx) {
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
    }
}