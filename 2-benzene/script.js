import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const materialCarbon = new THREE.MeshPhysicalMaterial({ color: "#bdbdbd" });
materialCarbon.roughness = 0.4;
materialCarbon.transmission = 0.5;
materialCarbon.ior = 0.2;
materialCarbon.thickness = 0.8;

const unitLength = 2;
const unitLengthLong = 1.8;

const carbonSize = 1.6;
const hydrogenSize = 1;

const geometryCarbon = new THREE.SphereGeometry(carbonSize);

const c1 = new THREE.Mesh(geometryCarbon, materialCarbon);
const c2 = new THREE.Mesh(geometryCarbon, materialCarbon);
const c3 = new THREE.Mesh(geometryCarbon, materialCarbon);
const c4 = new THREE.Mesh(geometryCarbon, materialCarbon);
const c5 = new THREE.Mesh(geometryCarbon, materialCarbon);
const c6 = new THREE.Mesh(geometryCarbon, materialCarbon);
c1.position.set(1 * unitLength, 0, 0);
c2.position.set(0.5 * unitLength, 0.866 * unitLength, 0);
c3.position.set(-0.5 * unitLength, 0.866 * unitLength, 0);
c4.position.set(-1 * unitLength, 0, 0);
c5.position.set(-0.5 * unitLength, -0.866 * unitLength, 0);
c6.position.set(0.5 * unitLength, -0.866 * unitLength, 0);

const materialHydrogen = new THREE.MeshPhysicalMaterial({ color: "white" });
materialHydrogen.roughness = 0.4;
materialHydrogen.transmission = 0.5;
materialHydrogen.ior = 0.2;
materialHydrogen.thickness = 0.8;

const geometryHydrogen = new THREE.SphereGeometry(hydrogenSize);

const h1 = new THREE.Mesh(geometryHydrogen, materialHydrogen);
const h2 = new THREE.Mesh(geometryHydrogen, materialHydrogen);
const h3 = new THREE.Mesh(geometryHydrogen, materialHydrogen);
const h4 = new THREE.Mesh(geometryHydrogen, materialHydrogen);
const h5 = new THREE.Mesh(geometryHydrogen, materialHydrogen);
const h6 = new THREE.Mesh(geometryHydrogen, materialHydrogen);

h1.position.set(2 * unitLengthLong, 0, 0);
h2.position.set(1 * unitLengthLong, 1.732 * unitLengthLong, 0);
h3.position.set(-1 * unitLengthLong, 1.732 * unitLengthLong, 0);
h4.position.set(-2 * unitLengthLong, 0, 0);
h5.position.set(-1 * unitLengthLong, -1.732 * unitLengthLong, 0);
h6.position.set(1 * unitLengthLong, -1.732 * unitLengthLong, 0);

const group = new THREE.Group();
group.add(c1, c2, c3, c4, c5, c6, h1, h2, h3, h4, h5, h6);
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
camera.position.z = 18;
scene.add(camera);

// Lights
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 0.5;
scene.add(ambientLight);

// Env maps.
const cubeTextureLoader = new THREE.CubeTextureLoader();
const ldrUrls = ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"];

const backgroundTexture = cubeTextureLoader
  .setPath("/2-benzene/background/")
  .load(ldrUrls);
scene.background = backgroundTexture;
materialHydrogen.envMap = backgroundTexture;
materialCarbon.envMap = backgroundTexture;

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
