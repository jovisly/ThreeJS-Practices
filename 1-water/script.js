import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const materialRed = new THREE.MeshStandardMaterial({ color: "red" });
materialRed.roughness = 0.4;

const hydrogen = new THREE.Mesh(new THREE.SphereGeometry(1), materialRed);

const materialWhite = new THREE.MeshStandardMaterial({ color: "white" });
materialWhite.roughness = 0.4;

const oxygen1 = new THREE.Mesh(new THREE.SphereGeometry(0.7), materialWhite);
oxygen1.position.x = 1 * Math.sin((52.2 * Math.PI) / 180);
oxygen1.position.y = -1 * Math.cos((52.2 * Math.PI) / 180);

const oxygen2 = new THREE.Mesh(new THREE.SphereGeometry(0.7), materialWhite);
oxygen2.position.x = -1 * Math.sin((52.2 * Math.PI) / 180);
oxygen2.position.y = -1 * Math.cos((52.2 * Math.PI) / 180);

const group = new THREE.Group();
group.add(hydrogen, oxygen1, oxygen2);
scene.add(group);

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

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 8;
scene.add(camera);

// Lights
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 0.5;
scene.add(ambientLight);

const rectAreaLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  group.rotation.y = 1 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
