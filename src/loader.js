export function loadImage (src) {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.src = src;
        image.onload = () => resolve(image);
        image.onerror = (e) => reject(e); 
    });
}

export function loadJSON (src) {
    return fetch(src).then(context => context.json());
}