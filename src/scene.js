import * as THREE from "three";
import { createCamera } from "./camera";
import { createAssetInstance } from "./assets.js";

export function createScene() {
    // Initial scene setup
    const gameWindow = document.getElementById("render-target");
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x334433);

    const camera = createCamera(gameWindow);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);

    let terrain = [];
    let buildings = [];

    function initialize(city) {
        scene.clear();
        terrain = [];
        buildings = [];
        for (let x = 0; x < city.size; x++) {
            const row = [];
            for (let y = 0; y < city.size; y++) {
                const terrainId = city.data[x][y].terrainId;
                const mesh = createAssetInstance(terrainId, x, y);
                scene.add(mesh);
                row.push(mesh);
            }
            terrain.push(row);
            buildings.push([...Array(city.size)]);
        }
        setupLights();
    }

    function update(city, time) {
        for (let x = 0; x < city.size; x++) {
            for (let y = 0; y < city.size; y++) {
                const currentBuildingId = buildings[x][y]?.userData.id;
                const newBuildingId = city.data[x][y].buildingId;
                console.log(
                    `time: ${time}[${x}][${y}] -> currentBuildingId: ${currentBuildingId}, newBuildingId: ${newBuildingId}`
                );

                // If the player removes a building, remove it from the scene
                // if (!newBuildingId && currentBuildingId) {
                //     scene.remove(buildings[x][y]);
                //     buildings[x][y] = undefined;
                // }

                // If the data model has changed, update the mesh
                if (newBuildingId !== currentBuildingId) {
                    scene.remove(buildings[x][y]);
                    buildings[x][y] = createAssetInstance(newBuildingId, x, y);
                    scene.add(buildings[x][y]);
                }
            }
        }
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
        update,
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove,
    };
}
