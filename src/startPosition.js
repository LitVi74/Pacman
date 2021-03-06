import { Cinematic } from "./cinematic.js";
import { DisplayObject } from "./displayObjaect.js";
import { loadImage, loadJSON } from "./loader.js";
import { Sprite } from "./sprite.js";

const SCALE = 2;
const IMAGE = await loadImage('/sets/spritesheet.png');
const ATLAS = await loadJSON('/sets/atlas.json');

let startPositions = []

let maze = new Sprite({
    name: 'maze',
    img: IMAGE,
    x: 0,
    y: 0,
    width: ATLAS.maze.width * SCALE,
    height: ATLAS.maze.height * SCALE,
    frame: ATLAS.maze
});

startPositions.push(maze);

ATLAS.maze.foods.map(food => {
    let obj = {
        x: food.x * SCALE,
        y: food.y * SCALE,
        width: food.width * SCALE,
        height: food.height * SCALE,
    }

    return obj;
}).map(food => startPositions.push(
    new Sprite({
        name: 'food',
        img: IMAGE,
        frame: ATLAS.food,
        ...food
    }))
);

let pacman = new Cinematic({
    name: 'pacman',
    img: IMAGE,
    x: ATLAS.position.pacman.x * SCALE,
    y: ATLAS.position.pacman.y * SCALE,
    width: ATLAS.position.pacman.width * SCALE,
    height: ATLAS.position.pacman.height * SCALE,
    animations: ATLAS.pacman,
});
pacman.start('left');

startPositions.push(pacman);

let ghosts = [
    'red',
    'pink',
    'turquoise',
    'banana'
].map(color => {
    let ghost = new Cinematic({
        name: "ghost",
        img: IMAGE,
        x: ATLAS.position[color].x * SCALE,
        y: ATLAS.position[color].y * SCALE,
        width: ATLAS.position[color].width * SCALE,
        height: ATLAS.position[color].height * SCALE,
        animations: ATLAS[`${color}Ghost`],
        nextDirection: ATLAS.position[color].direction
    });
    ghost.start(ATLAS.position[color].direction);
    ghost.isBlue = false;

    startPositions.push(ghost);
});

ATLAS.maze.walls.map(wall => startPositions.push(
    new DisplayObject({
        name: "wall",
        x: wall.x * SCALE,
        y: wall.y * SCALE,
        width: wall.width * SCALE,
        height: wall.height * SCALE,
        //debug: true
    }))
);

ATLAS.position.tablets.map(tablet => startPositions.push(
    new Sprite({
        name: "tablet",
        img: IMAGE,
        x: tablet.x * SCALE,
        y: tablet.y * SCALE,
        width: tablet.width * SCALE,
        height: tablet.height * SCALE,
        frame: ATLAS.tablet,
    }))
);

export { startPositions };

let blueGhost = ATLAS.blueGhost;

export {blueGhost};