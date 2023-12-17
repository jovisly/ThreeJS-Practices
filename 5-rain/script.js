import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "cannon-es";
import GUI from "lil-gui";

/**
 * Debug
 */
const gui = new GUI();
const debugObject = { mode: "zen" };

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Physics World
const world = new CANNON.World();
world.gravity.set(0, 0, 0);
// For optimization.
world.broadphase = new CANNON.SAPBroadphase(world);
world.allowSleep = true;

// Physics Materials
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

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

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

// Fog
const fog = new THREE.Fog("white", -10, 100);
scene.fog = fog;

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  50,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 20);

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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Utils
const objectsToUpdate = [];
const sphereGeometryO = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterialO = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  color: "red",
});
const sphereGeometryH = new THREE.SphereGeometry(0.7, 32, 32);
const sphereMaterialH = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  color: "white",
});

const radiusPhysicsBody = 1.66;

const createWater = (position) => {
  const group = new THREE.Group();

  const oxygen = new THREE.Mesh(sphereGeometryO, sphereMaterialO);
  const hydrogen1 = new THREE.Mesh(sphereGeometryH, sphereMaterialH);
  const hydrogen2 = new THREE.Mesh(sphereGeometryH, sphereMaterialH);

  hydrogen1.position.x = 1 * Math.sin((52.2 * Math.PI) / 180);
  hydrogen1.position.y = -1 * Math.cos((52.2 * Math.PI) / 180);

  hydrogen2.position.x = -1 * Math.sin((52.2 * Math.PI) / 180);
  hydrogen2.position.y = -1 * Math.cos((52.2 * Math.PI) / 180);
  group.add(oxygen, hydrogen1, hydrogen2);
  group.position.copy(position);
  // Random rotation for each molecule.
  group.rotation.x = Math.random() * Math.PI;
  group.rotation.y = Math.random() * Math.PI;
  group.rotation.z = Math.random() * Math.PI;

  scene.add(group);

  // Physics body.
  const shape = new CANNON.Box(
    new CANNON.Vec3(radiusPhysicsBody, radiusPhysicsBody, radiusPhysicsBody)
  );
  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape: shape,
    material: defaultMaterial,
  });
  body.position.copy(position);
  body.quaternion.setFromAxisAngle(
    new CANNON.Vec3(1, 0, 0),
    Math.random() * Math.PI
  );

  world.addBody(body);

  // Save in objects to update.
  objectsToUpdate.push({
    waterGroup: group,
    prevHeight: group.position.y,
    physicsBody: body,
    outOfViewCounter: 0,
  });
};

const numberOfWaters = 1000;
gui.add(debugObject, "mode", ["zen", "chaos"]).onFinishChange(() => {
  // Clear objectsToUpdate array if mode is changed.
  objectsToUpdate.forEach((obj) => scene.remove(obj.waterGroup));
  objectsToUpdate.length = 0;
});

/**
 * Animate
 */
const clock = new THREE.Clock();
let oldElapsedTime = 0;
let waterTimer = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;
  waterTimer += deltaTime;

  if (waterTimer >= 0.25 && objectsToUpdate.length < numberOfWaters) {
    if (debugObject.mode === "zen") {
      createWater({
        x: (0.5 - Math.random()) * 80,
        y: Math.random() * 10 + 20,
        z: -50 + Math.random() * 30,
      });
    } else {
      createWater({
        x: 0,
        y: 20,
        z: -30,
      });
    }

    waterTimer = 0;
  }

  world.step(1 / 60, deltaTime, 3);

  for (const object of objectsToUpdate) {
    object.waterGroup.position.copy(object.physicsBody.position);

    object.waterGroup.position.y += (1 - Math.random()) * 0.1 - 0.1;
    object.waterGroup.position.x += (1 - Math.random()) * 0.1 + 0.02;
    object.waterGroup.rotation.x += (1 - Math.random()) * 0.1;
    object.waterGroup.rotation.y += (1 - Math.random()) * 0.1;
    object.waterGroup.rotation.z += (1 - Math.random()) * 0.1;

    if (!frustum.containsPoint(object.waterGroup.position)) {
      object.outOfViewCounter++;
      if (object.outOfViewCounter > 100) {
        object.waterGroup.position.y = -1 * object.waterGroup.position.y;
        object.waterGroup.position.x = -1 * object.waterGroup.position.x;
        object.outOfViewCounter = -100;
      }
    }

    object.physicsBody.position.copy(object.waterGroup.position);
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
