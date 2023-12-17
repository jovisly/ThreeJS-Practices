import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

import addAxes from "./axes.js";
import addLights from "./lights.js";
import addSurface from "./surface.js";

import testVertextShader from "./shaders/vertex.glsl";
import testFragmentShader from "./shaders/fragment.glsl";

// Debug
const gui = new GUI();
const guiObject = { showWireframe: false };

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const textureLoader = new THREE.TextureLoader();
const jetTexture = textureLoader.load("/6-matlab/jet-only.png");
jetTexture.minFilter = THREE.NearestFilter;
jetTexture.magFilter = THREE.NearestFilter;
jetTexture.generateMipmaps = false;

const surfaceMaterial = new THREE.ShaderMaterial({
  vertexShader: testVertextShader,
  fragmentShader: testFragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: jetTexture },
  },
  side: THREE.DoubleSide,
});

const wireframeMaterial = new THREE.ShaderMaterial({
  vertexShader: testVertextShader,
  fragmentShader: testFragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: jetTexture },
  },
  side: THREE.DoubleSide,
  transparent: true,
});

const scene = new THREE.Scene();
addLights(scene);

const axes = addAxes();
let surface = addSurface(
  surfaceMaterial,
  wireframeMaterial,
  guiObject.showWireframe
);
const group = new THREE.Group();
group.add(axes, surface);
scene.add(group);

gui.add(guiObject, "showWireframe").onChange(() => {
  group.remove(surface);
  surface = addSurface(
    surfaceMaterial,
    wireframeMaterial,
    guiObject.showWireframe
  );
  group.add(surface);
});

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(2, 2, 12);

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

  // Animation.
  surfaceMaterial.uniforms.uTime.value = elapsedTime * 0.8;
  wireframeMaterial.uniforms.uTime.value = elapsedTime * 0.8;
  group.rotation.y = 0.1 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
