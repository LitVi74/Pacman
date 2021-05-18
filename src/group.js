import { DisplayObject } from "./displayObjaect.js";

export class Group extends DisplayObject {
    constructor (config = {}) {
        super(config);
        
        this.container = new Set() 
    }

    get items () {
        return Array.from(this.container);
    }

    add (...dos) {
        for (let displayObjaect of dos) {
            this.container.add(displayObjaect);
        }
    }

    remove (...dos) {
        for (let displayObjaect of dos) {
            this.container.delete(displayObjaect);
        }
    }

    update(delta) {
        this.items.forEach(item => item.update(delta));
    }

    draw(ctx) {
        this.items.forEach(item => item.draw(ctx));
    }
}