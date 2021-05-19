import { Game } from "./game.js";
import { loadJSON } from "./loader.js";

const SCALE = 2;
async function main () {
    const ATLAS = await loadJSON('/sets/atlas.json');

    let game = new Game ({
        width: ATLAS.maze.width * SCALE,
        height: ATLAS.maze.height * SCALE,
    });

    document.body.append(game.canvas);
    
    document.addEventListener('keydown', (event) => game.movePacman(event));
}

main();