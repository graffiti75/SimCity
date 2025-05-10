
# Create a Three.js VITE project

```
npm init -y
npm install three
npm install --save-dev gh-pages vite @types/three http-server
```

# Create `package.json`

```
{
  "name": "homeworld",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "vite",
    "start": "vite",
    "build": "vite build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist -m '< add commit message >'"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "three": "^0.176.0"
  },
  "devDependencies": {
    "@types/three": "^0.176.0",
    "gh-pages": "^6.3.0",
    "http-server": "^14.1.1",
    "vite": "^6.3.5"
  }
}
```

# Create `index.js`

```
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Add light
scene.add(ambientLight);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x33aaff);
document.body.appendChild(renderer.domElement);

// Add orbit controls
// const controls = new THREE.OrbitControls(camera, renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Create grid for X-axis (XZ plane)
const gridXZ = new THREE.GridHelper(20, 20, 0x00ff00, 0x444444);
gridXZ.position.y = 0;
scene.add(gridXZ);

// Create grid for Y-axis (YZ plane)
const gridYZ = new THREE.GridHelper(20, 20, 0xff0000, 0x444444);
gridYZ.rotation.z = Math.PI / 2;
gridYZ.position.x = 0;
scene.add(gridYZ);

// Add coordinate axes
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Position camera
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
```

# Create `index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Grid Interface</title>
    <style>
        body { margin: 0; overflow: hidden; }
        canvas { display: block; }
    </style>
</head>
<body>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script> -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script> -->
    <!-- <script src="index.js"></script> -->
  <script type="module" src="index.js"></script>
</body>
</html>
```

# Create `vite.config.js`

```
export default {
  base: "/ThreeWorld/",
  server: {
    open: true,
  },
};
```

# Create `.gitignore`

```
node_modules/
dist/
.vite/
```
