import { getWallCollition } from "./additional.js";
import { Sprite } from "./sprite.js";

export class Cinematic extends Sprite {
    constructor (config = {}) {
        super(config);

        this.animations = config.animations || null;
        this.animation = null;
        this.cooldown = 0;
        this.timer = 0;
        this.frameNum = 0;

        this.nextDirection = "left";
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

    changeDirection (walls) {
        switch (this.nextDirection) {
            case "up":
                this.y -= 10;
                if (!getWallCollition(this, walls)) {
                    this.nextDirection = null;
                    this.speedX = 0;
                    this.speedY = -1;
                    this.start("up");
                }
                this.y += 10;
                break;
            case "down":
                this.y += 10;
                if (!getWallCollition(this, walls)) {
                    this.nextDirection = null;
                    this.speedX = 0;
                    this.speedY = 1;
                    this.start("down");
                }
                this.y -= 10;
                break;
            case "left":
                this.x -= 10;
                if (!getWallCollition(this, walls)) {
                    this.nextDirection = null;
                    this.speedX = -1;
                    this.speedY = 0;
                    this.start("left");
                }
                this.x += 10;
                break;
            case "right":
            this.x += 10;
            if (!getWallCollition(this, walls)) {
                this.nextDirection = null;
                this.speedX = 1;
                this.speedY = 0;
                this.start("right");
            }
            this.x -= 10;
            break;
        } 
    }

    update (delta) {
        super.update(delta);
        this.timer += delta

        if (this.timer >= this.cooldown) {
            this.frameNum = (this.frameNum + 1) % this.animation.frames.length;
            this.frame = this.animation.frames[this.frameNum];
            this.timer = 0;
        }
    }
}