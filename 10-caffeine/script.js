import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OutlineEffect } from "three/addons/effects/OutlineEffect.js";

import renderMolecule from "./renderMolecule.js";

import Stats from "three/addons/libs/stats.module.js";
import * as Colors from "./colors.js";

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const effect = new OutlineEffect(renderer);

// Special colors.
const format = renderer.capabilities.isWebGL2
  ? THREE.RedFormat
  : THREE.LuminanceFormat;

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(Colors.deepPurple600);

const rootGroup = new THREE.Group();
scene.add(rootGroup);

renderMolecule(rootGroup, format);

// Camera
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  1,
  5000
);
camera.position.z = 1000;
scene.add(camera);

// Ambient light
const ambientLight = new THREE.AmbientLight(0xc1c1c1, 3);
scene.add(ambientLight);

const particleLight = new THREE.Mesh(
  new THREE.SphereGeometry(4, 8, 8),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
particleLight.position.set(300, 300, 0);
scene.add(particleLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 800, 0);
particleLight.add(pointLight);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Animate
const clock = new THREE.Clock();

const tick = () => {
  stats.begin();

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  rootGroup.rotation.y = 0.5 * elapsedTime;
  particleLight.position.x = 600 * Math.cos(Math.PI / 2 + elapsedTime * 0.5);
  particleLight.position.y = 600 * Math.sin(Math.PI / 2 + elapsedTime * 0.5);

  // Update controls
  controls.update();

  // Render
  effect.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
  stats.end();
};

tick();
