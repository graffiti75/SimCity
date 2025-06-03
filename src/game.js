import { createScene } from "./scene.js";
import { createCity } from "./city.js";

let time = 0;

export function createGame() {
    const scene = createScene();
    const city = createCity(16);
    scene.initialize(city);
    window.scene = scene;
    document.addEventListener("mousedown", window.scene.onMouseDown, false);
    document.addEventListener("mouseup", window.scene.onMouseUp, false);
    document.addEventListener("mousemove", window.scene.onMouseMove, false);
    document.addEventListener(
        "contextmenu",
        (event) => event.preventDefault(),
        false
    );

    const game = {
        update() {
            time += 1;
            console.log(`time: ${time}`);
            city.update();
            scene.update(city, time);
        },
    };

    setInterval((t) => {
        game.update(t);
    }, 1000);

    scene.start();

    return game;
}
