import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import NBody from "./nbody";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 0, 50);

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// add points
const mass = [];
const position = [];
const velocity = [];

for (let i = 0; i < 1000; i++) {
    const m = 1;
    const x = THREE.MathUtils.randFloatSpread(100);
    const y = THREE.MathUtils.randFloatSpread(100);
    const z = THREE.MathUtils.randFloatSpread(100);
    const vx = 0;
    const vy = 0;
    const vz = 0;

    mass.push(m);
    position.push(x, y, z);
    velocity.push(vx, vy, vz);
}

const nbody = new NBody(mass, position, velocity);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(position, 3)
);
const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 });
const stars = new THREE.Points(geometry, material);
scene.add(stars);

// animate
let lastTime = 0;
function animate(currentTime) {
    let deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    // update stars
    nbody.update(deltaTime / 1000);
    const position = stars.geometry.attributes.position.array;
    for (let i = 0; i < 3 * nbody.num; i++) {
        position[i] = nbody.pos[i];
    }
    stars.geometry.attributes.position.needsUpdate = true;

    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
