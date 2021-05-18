export class DisplayObject {
    constructor (config = {}) {
        this.visible = config.visible || true;

        this.x = config.x || 0;
        this.y = config.y || 0;
        this.width = config.width || 0;
        this.height = config.height || 0;
    }

    update () {
        
    }

    draw () {

    }
}