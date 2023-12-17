import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import * as CANNON from "cannon-es";

import {
  makeArgone,
  makeCarbon,
  makeNitrogen,
  makeOxygen,
  makeHydrogen,
} from "./makeMolecules.js";

const rgbeLoader = new RGBELoader();

// Physics
const world = new CANNON.World();
world.gravity.set(0, 0, 0);

// For optimization.
world.broadphase = new CANNON.SAPBroadphase(world);
world.allowSleep = true;

// Materials
const defaultMaterial = new CANNON.Material("concrete");
const defaultContactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.2,
    restitution: 0.4,
  }
);
world.addContactMaterial(defaultContactMaterial);
world.defaultContactMaterial = defaultContactMaterial;

// Canvas
const canvas = document.querySelector("canvas.webgl");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();

const fog = new THREE.Fog("white", -10, 100);
scene.fog = fog;

// Atoms
const atomNumScale = 1;
const atomNums = {
  N2: 120 * atomNumScale,
  O2: 40 * atomNumScale,
  Ar: 2 * atomNumScale * 6,
  CO2: 1 * atomNumScale * 6, // This is way too many already but ok.
  H2O: 5 * atomNumScale * 3,
};

const allObjects = {};

// Molecules.
for (let i = 0; i < atomNums.N2; i++) {
  const obj = makeNitrogen(scene, world);
  const id = obj.mesh.uuid;
  allObjects[id] = obj;
}

for (let i = 0; i < atomNums.Ar; i++) {
  const obj = makeArgone(scene, world);
  const id = obj.mesh.uuid;
  allObjects[id] = obj;
}

for (let i = 0; i < atomNums.O2; i++) {
  const obj = makeOxygen(scene, world);
  const id = obj.mesh.uuid;
  allObjects[id] = obj;
}

for (let i = 0; i < atomNums.CO2; i++) {
  const obj = makeCarbon(scene, world);
  const id = obj.mesh.uuid;
  allObjects[id] = obj;
}

for (let i = 0; i < atomNums.H2O; i++) {
  const obj = makeHydrogen(scene, world);
  const id = obj.mesh.uuid;
  allObjects[id] = obj;
}

// Background
rgbeLoader.load("/9-breathe/forest_cave_4k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = environmentMap;
  scene.background = environmentMap;
});

// Mouse
const mouse = new THREE.Vector2();
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

// Raycaster
const raycaster = new THREE.Raycaster();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 12);

camera.updateMatrix();
camera.updateMatrixWorld();
const frustum = new THREE.Frustum();
frustum.setFromProjectionMatrix(
  new THREE.Matrix4().multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  )
);

scene.add(camera);

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

const plusOrMinus = () => (Math.random() < 0.5 ? -1 : 1);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Clock
const clock = new THREE.Clock();
const allIds = Object.keys(allObjects);
const allMeshs = allIds.map((id) => allObjects[id].mesh);

let oldElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;

  world.step(1 / 60, deltaTime, 3);

  allIds.forEach((id) => {
    allObjects[id].mesh.position.copy(allObjects[id].physicsBody.position);
  });

  // Random motion and boundary condition.
  allIds.forEach((id) => {
    const molecule = allObjects[id].mesh;

    // First a consistent push that is greater than random motion.
    molecule.position.x += 0.005;
    molecule.position.y -= 0.01;

    molecule.position.x += Math.random() * 0.02 - 0.01;
    molecule.position.y += Math.random() * 0.02 - 0.01;
    molecule.position.z += Math.random() * 0.02 - 0.01;

    molecule.rotation.x += 0.01 * (Math.random() * Math.PI * 2 - Math.PI);
    molecule.rotation.y += 0.01 * (Math.random() * Math.PI * 2 - Math.PI);
    molecule.rotation.z += 0.01 * (Math.random() * Math.PI * 2 - Math.PI);

    // Boundary condition.
    if (!frustum.containsPoint(molecule.position)) {
      molecule.position.x = Math.random() * 120 - 60;
      molecule.position.y = Math.random() * 120 - 60;
      molecule.position.z = -1 * Math.random() * 20;

      molecule.rotation.x = Math.random() * Math.PI * 2 - Math.PI;
      molecule.rotation.y = Math.random() * Math.PI * 2 - Math.PI;
      molecule.rotation.z = Math.random() * Math.PI * 2 - Math.PI;
    }
    allObjects[id].physicsBody.position.copy(molecule.position);
  });

  // Move out of the mouse.
  raycaster.setFromCamera(mouse, camera);

  const intersets = raycaster.intersectObjects(allMeshs);
  intersets.forEach((intersect) => {
    const id =
      intersect.object.parent && intersect.object.parent.isGroup
        ? intersect.object.parent.uuid
        : intersect.object.uuid;
    const body = allObjects[id].physicsBody;
    body.applyForce(
      new CANNON.Vec3(
        plusOrMinus() * (2 + Math.random() / 2),
        plusOrMinus() * (2 + Math.random() / 2),
        0
      ),
      body.position
    );
  });

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
