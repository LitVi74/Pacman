import { Cinematic } from "./cinematic.js";
import { Game } from "./game.js";
import { loadImage, loadJSON } from "./loader.js";
import { Sprite } from "./sprite.js";

const SCALE = 2;

async function main () {
    const IMAGE = await loadImage('/sets/spritesheet.png');
    const ATLAS = await loadJSON('/sets/atlas.json');

    let game = new Game ({
        width: ATLAS.maze.width * SCALE,
        height: ATLAS.maze.height * SCALE,
    });

    document.body.append(game.canvas);

    
    /*
    let pacman = new Cinematic({
        img,
        x: 100,
        y: 100,
        width: 20,
        height: 20,
        animations: atlas.pacman
    })

    pacman.start('left');

    game.stage.add(pacman);*/

    let maze = new Sprite({
        img: IMAGE,
        x: 0,
        y: 0,
        width: ATLAS.maze.width * SCALE,
        height: ATLAS.maze.height * SCALE,
        frame: ATLAS.maze
    });

    let foods = ATLAS.maze.foods.map(food => {
        let obj = {
            x: food.x * SCALE,
            y: food.y * SCALE,
            width: food.width * SCALE,
            height: food.height * SCALE,
        }

        return obj;
    }).map(food => new Sprite({
        img: IMAGE,
        frame: ATLAS.food,
        ...food
    }));

    let pacman = new Cinematic({
        img: IMAGE,
        x: ATLAS.position.pacman.x * SCALE,
        y: ATLAS.position.pacman.y * SCALE,
        width: ATLAS.position.pacman.width * SCALE,
        height: ATLAS.position.pacman.height * SCALE,
        animations: ATLAS.pacman
    });
    pacman.start('left');

    let ghosts = [
        'red',
        'pink',
        'turquoise',
        'banana'
    ].map(color => {
        let ghost = new Cinematic({
            img: IMAGE,
            x: ATLAS.position[color].x *SCALE,
            y: ATLAS.position[color].y *SCALE,
            width: ATLAS.position[color].width *SCALE,
            height: ATLAS.position[color].height *SCALE,
            animations: ATLAS[`${color}Ghost`]
        });
        ghost.start(ATLAS.position[color].direction);

        return ghost;
    })

    game.stage.add(maze);
    foods.forEach(food => game.stage.add(food));
    game.stage.add(pacman);
    ghosts.forEach(ghost => game.stage.add(ghost));
}

main();