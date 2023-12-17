import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

import vertextShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

// Canvas
const canvas = document.querySelector("canvas.webgl");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();

// 2x2 to fill up the clip space.
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
const overlayMaterial = new THREE.ShaderMaterial({
  vertexShader: vertextShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uAlpha: { value: 1 },
    uResolutionX: { value: sizes.width / 2 },
    uResolutionY: { value: sizes.height / 2 },
  },
});

const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial);
scene.add(overlay);

// Camera
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

  // Update normals.
  overlayMaterial.uniforms.uResolutionX.value = sizes.width / 2;
  overlayMaterial.uniforms.uResolutionY.value = sizes.height / 2;
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

// Clock
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Animation.
  overlayMaterial.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
