import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import waterVertexShader from "./shaders/water/vertex.glsl";
import waterFragmentShader from "./shaders/water/fragment.glsl";

// Audio
const audio = new Audio("/7-moonlight/moonlight.mp3");
let dataArray = null;
let analyser = null;

function getAverageFrequency(dataArray) {
  const sum = dataArray.reduce((a, b) => a + b, 0);
  return sum / dataArray.length;
}

function getVolume(dataArray) {
  const sum = dataArray.reduce((a, b) => a + b, 0);
  const average = sum / dataArray.length;
  return average / 255; // normalized value between 0 and 1
}

const playButton = document.getElementById("playButton");
const refText = document.getElementById("reference-text");

// Debug
const debugObject = {
  depthColor: "#186691",
  surfaceColor: "#9bd8ff",
};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Geometry
const waterGeometry = new THREE.PlaneGeometry(20, 20, 512, 512);

const count = waterGeometry.attributes.position.count;
const randoms = new Float32Array(count);
for (let i = 0; i < count; i++) {
  randoms[i] = Math.random();
}

waterGeometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));

// Material
const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uBigWavesFrequency: { value: new THREE.Vector2(4, 1) },
    uTime: { value: 0 },
    uAmp: { value: 0 },
    uBigWaveSpeed: { value: 0.8 },
    uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
    uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
  },
});

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI * 0.5;

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
camera.position.set(1, 1, 2);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const clock = new THREE.Clock();

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

playButton.addEventListener("click", function () {
  // Create scene and Start the animation.
  scene.add(water);

  // Play the audio when the button is clicked
  audio.play();
  const audioContext = new AudioContext();
  const source = audioContext.createMediaElementSource(audio);
  analyser = audioContext.createAnalyser();
  const bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  // Connect the audio source to the analyser node
  source.connect(analyser);
  source.connect(audioContext.destination);

  // Set the size of the analysis window
  analyser.fftSize = 2048;

  // processAudio();
  playButton.style.display = "none";
  refText.style.display = "none";

  tick();
});

// Animate
const tick = () => {
  // Try a bit of delay.
  const elapsedTime = clock.getElapsedTime();

  // Get the current audio data
  if (analyser !== null) {
    analyser.getByteFrequencyData(dataArray);

    // Use the data to update visuals or perform other analysis
    const averageFrequency = getAverageFrequency(dataArray);
    const volume = getVolume(dataArray);

    waterMaterial.uniforms.uAmp.value = volume * 24;
  }

  waterMaterial.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
