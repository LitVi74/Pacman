export function haveCollision (mainObj, sideObj) {
    let mainPoints = [
        { x: mainObj.x, y: mainObj.y },
        { x: mainObj.x + mainObj.width, y: mainObj.y },
        { x: mainObj.x, y: mainObj.y + mainObj.height },
        { x: mainObj.x + mainObj.width, y: mainObj.y + mainObj.height },
    ];
    
    for (let point of mainPoints) {
        if (
            sideObj.x < point.x 
            && point.x < sideObj.x + sideObj.width
            && sideObj.y < point.y
            && point.y < sideObj.y + sideObj.height
        ) {
            return true;
        }
    }

    let sidePoints = [
        { x: sideObj.x, y: sideObj.y },
        { x: sideObj.x + sideObj.width, y: sideObj.y },
        { x: sideObj.x, y: sideObj.y + sideObj.height },
        { x: sideObj.x + sideObj.width, y: sideObj.y + sideObj.height },
    ];


    for (let point of sidePoints) {
        if (
            mainObj.x < point.x 
            && point.x < mainObj.x + mainObj.width
            && mainObj.y < point.y
            && point.y < mainObj.y + mainObj.height
        ) {
            return true;
        }
    }

    return false;
}

export function getWallCollition (obj, walls) {
    for (let wall of walls) {
        if (haveCollision(wall, obj)) {
            return wall;
        }
    }            

    return null;
}

export function getRandomElem (...arr) {
    let index = Math.floor(Math.random() * arr.length);
    return arr[index];
}