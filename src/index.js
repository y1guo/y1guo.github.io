import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ContextExclusionPlugin } from "webpack";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 0, 1);

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

function createBackground() {
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, -1, -1);
    const loader = new THREE.TextureLoader();
    const texture = loader.load("/docs/eso0932a.jpeg");
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
}
// createBackground();

// class Star {
//     constructor(stars) {
//         const geometry = new THREE.SphereGeometry(0.5, 12, 8);
//         const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
//         this.star = new THREE.Mesh(geometry, material);

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

//         const r = THREE.MathUtils.randFloat(50, 200);
//         const [x, y, z] = getSphericalRandom(r);

//         const maxv = Math.sqrt(2 / r) * Math.random();
//         const [vx, vy, vz] = getSphericalRandom(maxv);

//         this.pos = [x, y, z];
//         this.vel = [vx, vy, vz];

//         this.star.position.set(x, y, z);
//         scene.add(this.star);
//         stars.push(this);
//         console.log(this.pos, this.vel);
//     }
//     update(dt) {
//         dt /= 100;
//         const [x, y, z] = this.pos;
//         const [vx, vy, vz] = this.vel;
//         const r = Math.sqrt(x * x + y * y + z * z);
//         const factor = -dt / Math.pow(r, 3);
//         this.vel = [x * factor, y * factor, z * factor];
//         this.pos = [vx * dt, vy * dt, vz * dt];
//         this.star.position.set(x, y, z);
//     }
// }
// const stars = [];
// Array(2)
//     .fill()
//     .forEach(() => new Star(stars));

// let lastTime = 0;
// function animate(currentTime) {
//     let deltaTime = currentTime - lastTime;
//     lastTime = currentTime;

//     requestAnimationFrame(animate);

//     // stars.forEach((star) => star.update(deltaTime));

//     controls.update();

//     renderer.render(scene, camera);
// }
// requestAnimationFrame(animate);
