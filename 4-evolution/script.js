import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const objectsDistance = 4;

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// 3D Model
let model1, model2, model3;

const gltfLoader = new GLTFLoader();
gltfLoader.load("/4-evolution/alanine/scene.gltf", (gltf) => {
  gltf.scene.scale.set(0.24, 0.24, 0.24);
  const bbox = new THREE.Box3().setFromObject(gltf.scene);
  const center = new THREE.Vector3();
  bbox.getCenter(center);

  gltf.scene.position.x = -center.x;
  gltf.scene.position.y = -center.y - objectsDistance;
  gltf.scene.position.z = -center.z;

  const pivot = new THREE.Group();
  pivot.add(gltf.scene);
  scene.add(pivot);
  model1 = pivot;
});

gltfLoader.load("/4-evolution/arginine/scene.gltf", (gltf) => {
  gltf.scene.scale.set(0.24, 0.24, 0.24);
  const bbox = new THREE.Box3().setFromObject(gltf.scene);
  const center = new THREE.Vector3();
  bbox.getCenter(center);

  gltf.scene.position.x = -center.x;
  gltf.scene.position.y = -center.y;
  gltf.scene.position.z = -center.z;

  const pivot = new THREE.Group();
  pivot.add(gltf.scene);
  scene.add(pivot);

  model2 = pivot;
  model2.rotation.z = Math.PI / 2;
  model2.position.y += objectsDistance * -2;
  model2.position.x += 0.6;
});

gltfLoader.load("/4-evolution/arcanine/scene.gltf", (gltf) => {
  gltf.scene.scale.set(0.28, 0.28, 0.28);
  gltf.scene.position.y = -objectsDistance * 3.4;
  gltf.scene.position.x += 0.6;
  model3 = gltf.scene;

  scene.add(model3);
});

/* Particles */
const particleCount = 200;
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 1] =
    objectsDistance * 0.5 - Math.random() * objectsDistance * 5;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  color: "#C1DDF8",
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/* Lights */
const directionalLight = new THREE.DirectionalLight("#ffffff", 2);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight("#ffffff", 1.2);
scene.add(ambientLight);

/**
 * Sizes
 */
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

/**
 * Camera
 */
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
cameraGroup.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Scroll
let scrollY = window.scrollY;
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

// Cursor
const cursor = { x: 0, y: 0 };
window.addEventListener("mousemove", (event) => {
  // Make x and y to both go from -0.5 to 0.5.
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Camera. sizes.height is the height of the viewport.
  camera.position.y = (-objectsDistance * scrollY) / sizes.height;

  const parallaxX = cursor.x * 0.5;
  const parallaxY = -cursor.y * 0.5;

  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

  // Rotate models if they are loaded
  if (model1) {
    model1.rotation.y += 0.5 * deltaTime;
  }
  if (model2) {
    model2.rotation.y += 0.5 * deltaTime;
  }
  if (model3) {
    model3.rotation.y += 0.5 * deltaTime;
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
