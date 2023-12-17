import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import * as dat from "lil-gui";
import parsePdb from "parse-pdb";

THREE.ColorManagement.enabled = false;

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load(
  "/3-oxytocin/texture/matcap-green.png"
);

// Font
const groupTexts = new THREE.Group();
const fontLoader = new FontLoader();
fontLoader.load("/3-oxytocin/font/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hello!", {
    font: font,
    size: 2.4,
    height: 0.8,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.04,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  textGeometry.rotateX(0.2);
  textGeometry.center();
  textGeometry.translate(0, 18, 0);

  const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  const text1 = new THREE.Mesh(textGeometry, textMaterial);
  groupTexts.add(text1);

  const textGeometry2 = new TextGeometry("I'm Oxytocin!!", {
    font: font,
    size: 2.4,
    height: 0.8,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.04,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  textGeometry2.rotateX(-0.6);
  textGeometry2.center();
  textGeometry2.translate(0, -16, 0);

  const text2 = new THREE.Mesh(textGeometry2, textMaterial);

  groupTexts.add(text2);
});
scene.add(groupTexts);

// Atoms
// https://en.wikipedia.org/wiki/Atomic_radii_of_the_elements_(data_page)
const atomScale = 0.016;
const atomSizes = {
  N: 56 * atomScale,
  C: 67 * atomScale,
  O: 48 * atomScale,
  S: 88 * atomScale,
  H: 53 * atomScale,
};

// https://www.ch.ic.ac.uk/rzepa/mim/domestic/html/atomcols.htm
const atomColors = {
  N: "blue",
  C: "grey",
  O: "red",
  S: "yellow",
  H: "white",
};

const geometries = {};
geometries.N = new THREE.SphereGeometry(atomSizes["N"]);
geometries.C = new THREE.SphereGeometry(atomSizes["C"]);
geometries.O = new THREE.SphereGeometry(atomSizes["O"]);
geometries.S = new THREE.SphereGeometry(atomSizes["S"]);
geometries.H = new THREE.SphereGeometry(atomSizes["H"]);

const materials = {};
materials.N = new THREE.MeshPhongMaterial({ color: atomColors["N"] });
materials.C = new THREE.MeshPhongMaterial({ color: atomColors["C"] });
materials.O = new THREE.MeshPhongMaterial({ color: atomColors["O"] });
materials.S = new THREE.MeshPhongMaterial({ color: atomColors["S"] });
materials.H = new THREE.MeshPhongMaterial({ color: atomColors["H"] });

const groupAtoms = new THREE.Group();
fetch("/3-oxytocin/model/2mgo-model1.pdb")
  .then((response) => response.text())
  .then((data) => {
    // 134 Atoms.
    const parsedData = parsePdb(data);
    const atoms = parsedData.atoms;
    // Get all the atom types.
    const atomTypes = atoms.map((atom) => atom.element);
    // Get unique atom types.
    const uniqueAtomTypes = [...new Set(atomTypes)];

    // Iterate through all the atoms and print their element and x, y, z position.
    atoms.forEach((atom) => {
      const atomType = atom.element;
      const renderedAtom = new THREE.Mesh(
        geometries[atomType],
        materials[atomType]
      );
      renderedAtom.position.x = atom.x;
      renderedAtom.position.y = atom.y;
      renderedAtom.position.z = atom.z;
      groupAtoms.add(renderedAtom);
    });
  });

scene.add(groupAtoms);

// Lights
const ambientLight = new THREE.AmbientLight("#bdbdbd");
scene.add(ambientLight);

// Point light
const pointLight = new THREE.PointLight(0xffffff, 1, 100, 10);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 30;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  groupAtoms.rotation.y = 1 * elapsedTime;
  // Rotate the text but only between -30 and 30 degrees.
  groupTexts.rotation.y = Math.cos(elapsedTime) * Math.PI * 0.1;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
