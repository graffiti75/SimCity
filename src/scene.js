// import * as THREE from "https://unpkg.com/three/build/three.module.js";
import * as THREE from "three";
import { createCamera } from "./camera";

export function createScene() {
    // Initial scene setup
    const gameWindow = document.getElementById("render-target");
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x334433);

    const camera = createCamera(gameWindow);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);

    let meshes = [];

    function randomGreenColor(number) {
        // Fixed hue for green (120 degrees)
        const hue = 120;

        // Divide saturation and value into 8 levels each (for 8x8 = 64 combinations)
        const satLevels = 8;
        const valLevels = 8;

        // Map number (0-63) to saturation and value indices
        const satIndex = number % satLevels; // 0 to 7
        const valIndex = Math.floor(number / satLevels); // 0 to 7

        // Compute saturation (0.2 to 0.9) and value (0.2 to 0.9)
        const saturation = 0.2 + (satIndex * (0.9 - 0.2)) / (satLevels - 1);
        const value = 0.2 + (valIndex * (0.9 - 0.2)) / (valLevels - 1);

        // Convert HSV to RGB
        const h = hue / 60;
        const c = value * saturation;
        const x = c * (1 - Math.abs((h % 2) - 1));
        let r, g, b;

        if (h >= 1 && h < 2) [r, g, b] = [x, c, 0];
        else if (h >= 2 && h < 3) [r, g, b] = [0, c, x];
        else [r, g, b] = [0, x, c]; // Hue = 120 falls in this range

        const m = value - c;
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        // Return hex color code
        return (r << 16) | (g << 8) | b;
    }

    function randomColor(number, size) {
        // Hue ranges from 0 to 360, divided into 64 steps
        const hue = (number * 360) / (size * size);
        const saturation = 0.7; // Fixed saturation (70%)
        const value = 0.9; // Fixed value/brightness (90%)

        // Convert HSV to RGB
        const h = hue / 60;
        const c = value * saturation;
        const x = c * (1 - Math.abs((h % 2) - 1));
        let r, g, b;

        if (h >= 0 && h < 1) [r, g, b] = [c, x, 0];
        else if (h >= 1 && h < 2) [r, g, b] = [x, c, 0];
        else if (h >= 2 && h < 3) [r, g, b] = [0, c, x];
        else if (h >= 3 && h < 4) [r, g, b] = [0, x, c];
        else if (h >= 4 && h < 5) [r, g, b] = [x, 0, c];
        else [r, g, b] = [c, 0, x];

        const m = value - c;
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        // Convert RGB to hex
        return (r << 16) | (g << 8) | b;
    }

    function initialize(city) {
        scene.clear();
        meshes = [];
        for (let x = 0; x < city.size; x++) {
            const row = [];
            for (let y = 0; y < city.size; y++) {
                // ----- Grass geometry -----
                // 1. Load the mesh/3D object corresponding to the tile at (x, y)
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                // const colorIndex = x + y * city.size;
                // const color = randomColor(colorIndex, city.size);

                const colorIndex = x + y * city.size;
                const color = randomGreenColor(colorIndex);

                const material = new THREE.MeshLambertMaterial({
                    color: 0x00aa00,
                    // color: color,
                });

                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(x, -0.5, y);

                // 2. Add that mesh to the scene
                scene.add(mesh);

                // 3. Add that mesh to the meshes array
                row.push(mesh);

                // ----- Building geometry -----
                const tile = city.data[x][y];
                if (tile.building === "building") {
                    const buildingGeometry = new THREE.BoxGeometry(1, 1, 1);
                    const buildingMaterial = new THREE.MeshLambertMaterial({
                        color: 0xff8844,
                    });
                    const buildingMesh = new THREE.Mesh(
                        buildingGeometry,
                        buildingMaterial
                    );
                    buildingMesh.position.set(x, 0.5, y);
                    scene.add(buildingMesh);
                    row.push(buildingMesh);
                }
            }
            meshes.push(row);
        }
        setupLights();
    }

    function setupLights() {
        const lights = [
            new THREE.AmbientLight(0xffffff, 0.2),
            new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3),
        ];
        lights[1].position.set(0, 1, 0);
        lights[2].position.set(1, 1, 0);
        lights[3].position.set(0, 1, 1);

        scene.add(...lights);
    }

    function draw() {
        renderer.render(scene, camera.camera);
    }

    function start() {
        renderer.setAnimationLoop(draw);
    }

    function stop() {
        renderer.setAnimationLoop(null);
    }

    function onMouseDown(event) {
        camera.onMouseDown(event);
    }

    function onMouseUp(event) {
        camera.onMouseUp(event);
    }

    function onMouseMove(event) {
        camera.onMouseMove(event);
    }

    return {
        initialize,
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove,
    };
}

// window.onload = () => {
//     window.scene = createScene();
//     window.scene.start();
// };
