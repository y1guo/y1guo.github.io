import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

// const pointLight = new THREE.PointLight(0xffffff);
// scene.add(pointLight);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const vertices = [];

for (let i = 0; i < 1000000; i++) {
    const x = THREE.MathUtils.randFloatSpread(500);
    const y = THREE.MathUtils.randFloatSpread(500);
    const z = THREE.MathUtils.randFloatSpread(500);

    vertices.push(x, y, z);
}
const geometry = new THREE.BufferGeometry();
geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
);
const material = new THREE.PointsMaterial({ color: 0xffffff });
const stars = new THREE.Points(geometry, material);
scene.add(stars);

// class Star {
//     constructor(stars) {

//         function getSphericalRandom(r) {
//             const costheta = 2 * Math.random() - 1;
//             const sintheta = Math.sqrt(1 - costheta * costheta);
//             const phi = Math.random() * 2 * Math.PI;
//             return [
//                 r * sintheta * Math.cos(phi),
//                 r * sintheta * Math.sin(phi),
//                 r * costheta,
//             ];
//         }

//         const r = THREE.MathUtils.randFloat(50, 500);
//         const [x, y, z] = getSphericalRandom(r);

//         const v = Math.sqrt(2 / r) * (0.5 + 0.5 * Math.random());
//         let [vx, vy, vz] = getSphericalRandom(v);

//         this.pos = [x, y, z];
//         this.vel = [vx, vy, vz];

//         this.star.position.set(x, y, z);
//         scene.add(this.star);
//         stars.push(this);
//     }
//     update(dt) {
//         dt /= 100;
//         const [x, y, z] = this.pos;
//         const [vx, vy, vz] = this.vel;
//         const r = Math.sqrt(x * x + y * y + z * z);
//         const factor = -dt / Math.pow(r, 3);
//         this.vel = [vx + x * factor, vy + y * factor, vz + z * factor];
//         this.pos = [x + vx * dt, y + vy * dt, z + vz * dt];
//         this.star.position.set(x, y, z);
//     }
// }

let lastTime = 0;
function animate(currentTime) {
    let deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    requestAnimationFrame(animate);

    // stars.forEach((star) => star.update(deltaTime));

    controls.update();

    renderer.render(scene, camera);
}
requestAnimationFrame(animate);
