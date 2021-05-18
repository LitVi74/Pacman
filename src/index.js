import { Cinematic } from "./cinematic.js";
import { Game } from "./game.js";
import { loadImage, loadJSON } from "./loader.js";
import { Sprite } from "./sprite.js";

async function main () {
    let game = new Game ({
        width: 500,
        height: 500,
    });

    document.body.append(game.canvas);

    let img = await loadImage('/sets/spritesheet.png');
    let atlas = await loadJSON('/sets/atlas.json');

    let pacman = new Cinematic({
        img,
        x: 100,
        y: 100,
        width: 20,
        height: 20,
        animations: atlas.pacman
    })

    pacman.start('left');

    game.stage.add(pacman);
}

main();