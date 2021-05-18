import { Sprite } from "./sprite.js";

export class Cinematic extends Sprite {
    constructor (config = {}) {
        super(config);

        this.animations = config.animations || null;
        this.animation = null;
        this.cooldown = 0;
        this.timer = 0;
        this.frameNum = 0;
    }

    start (name) {
        let anim = this.animations.find(animation => animation.name === name);

        if (anim && this.animation !== anim) {
            this.animation = anim;
            this.cooldown = this.animation.duration / this.animation.frames.length;
            this.timer = 0;
            this.frameNum = 0;
            this.frame = this.animation.frames[0];
        }
    }

    update (delta) {
        this.timer += delta

        if (this.timer >= this.cooldown) {
            this.frameNum = (this.frameNum + 1) % this.animation.frames.length;
            this.frame = this.animation.frames[this.frameNum];
            this.timer = 0;
        }
    }
}