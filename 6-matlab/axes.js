import * as THREE from "three";
import * as colors from "./colors.js";

const axesColor = colors.grey200;
const axesLength = 10;
const axesMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  color: axesColor,
});
const axisGeometry = new THREE.CylinderGeometry(0.1, 0.1, axesLength);
const arrowGeometry = new THREE.ConeGeometry(0.2, 0.8);
const axesGroup = new THREE.Group();

// Origin -- draw a sphere at the origin.
const geoOrigin = new THREE.SphereGeometry(0.2, 32, 32);
const sphereOrigin = new THREE.Mesh(geoOrigin, axesMaterial);

// Axes.
const cylinderAxisX = new THREE.Mesh(axisGeometry, axesMaterial);
const cylinderAxisY = new THREE.Mesh(axisGeometry, axesMaterial);
const cylinderAxisZ = new THREE.Mesh(axisGeometry, axesMaterial);

// Position the cylinder
cylinderAxisX.position.set(axesLength / 2, 0, 0);
cylinderAxisX.rotation.set(0, 0, Math.PI / 2);

cylinderAxisY.position.set(0, axesLength / 2, 0);

cylinderAxisZ.position.set(0, 0, axesLength / 2);
cylinderAxisZ.rotation.set(Math.PI / 2, 0, 0);

// Arrows.
const coneX = new THREE.Mesh(arrowGeometry, axesMaterial);
const coneY = new THREE.Mesh(arrowGeometry, axesMaterial);
const coneZ = new THREE.Mesh(arrowGeometry, axesMaterial);

coneX.position.set(axesLength, 0, 0);
coneX.rotation.set(0, 0, -Math.PI / 2);

coneY.position.set(0, axesLength, 0);

coneZ.position.set(0, 0, axesLength);
coneZ.rotation.set(Math.PI / 2, 0, 0);

const addAxes = () => {
  axesGroup.add(
    sphereOrigin,
    cylinderAxisX,
    cylinderAxisY,
    cylinderAxisZ,
    coneX,
    coneY,
    coneZ
  );
  axesGroup.position.x += -axesLength / 2 - 0.2;
  axesGroup.position.z += -axesLength / 2 - 0.2;
  axesGroup.position.y += -axesLength / 2;

  return axesGroup;
};

export default addAxes;
