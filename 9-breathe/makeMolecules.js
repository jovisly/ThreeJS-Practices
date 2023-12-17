import * as THREE from "three";
import * as CANNON from "cannon-es";
import * as colors from "./colors.js";
// Physics Materials
const defaultMaterial = new CANNON.Material("concrete");

// https://en.wikipedia.org/wiki/Atomic_radii_of_the_elements_(data_page)
const atomScale = 0.008;
const atomSizes = {
  N: 56 * atomScale,
  C: 67 * atomScale,
  O: 48 * atomScale,
  S: 88 * atomScale,
  H: 36 * atomScale,
  Ar: 71 * atomScale,
};

// https://www.ch.ic.ac.uk/rzepa/mim/domestic/html/atomcols.htm
const atomColors = {
  N: colors.lightBlue400,
  C: colors.yellow600,
  O: colors.red700,
  S: "yellow",
  H: "white",
  Ar: colors.purple700,
};

const geometries = {};
geometries.N = new THREE.SphereGeometry(atomSizes["N"]);
geometries.C = new THREE.SphereGeometry(atomSizes["C"]);
geometries.O = new THREE.SphereGeometry(atomSizes["O"]);
geometries.S = new THREE.SphereGeometry(atomSizes["S"]);
geometries.H = new THREE.SphereGeometry(atomSizes["H"]);
geometries.Ar = new THREE.SphereGeometry(atomSizes["Ar"]);

const materials = {};
materials.N = new THREE.MeshStandardMaterial({ color: atomColors["N"] });
materials.C = new THREE.MeshStandardMaterial({ color: atomColors["C"] });
materials.O = new THREE.MeshStandardMaterial({ color: atomColors["O"] });
materials.S = new THREE.MeshStandardMaterial({ color: atomColors["S"] });
materials.H = new THREE.MeshStandardMaterial({ color: atomColors["H"] });
materials.Ar = new THREE.MeshStandardMaterial({ color: atomColors["Ar"] });

export const makeArgone = (scene, world) => {
  const molecule = new THREE.Mesh(geometries.Ar, materials.Ar);

  molecule.position.x = Math.random() * 120 - 60;
  molecule.position.y = Math.random() * 120 - 60;
  molecule.position.z = -1 * Math.random() * 20;

  molecule.rotation.x = Math.random() * Math.PI * 2 - Math.PI;
  molecule.rotation.y = Math.random() * Math.PI * 2 - Math.PI;
  molecule.rotation.z = Math.random() * Math.PI * 2 - Math.PI;

  // Physics body.
  const radiusPhysicsBody = atomSizes["Ar"];
  const shape = new CANNON.Sphere(radiusPhysicsBody);
  const body = new CANNON.Body({
    mass: radiusPhysicsBody * radiusPhysicsBody,
    position: new CANNON.Vec3(0, 0, 0),
    shape: shape,
    material: defaultMaterial,
  });

  body.position.copy(molecule.position);
  body.quaternion.setFromAxisAngle(
    new CANNON.Vec3(1, 0, 0),
    Math.random() * Math.PI
  );

  world.addBody(body);
  scene.add(molecule);

  return {
    mesh: molecule,
    physicsBody: body,
    type: "Ar",
  };
};

export const makeNitrogen = (scene, world) => {
  const atom1 = new THREE.Mesh(geometries.N, materials.N);
  const atom2 = new THREE.Mesh(geometries.N, materials.N);

  atom1.position.x = -0.2;
  atom2.position.x = 0.2;

  const group = new THREE.Group();
  group.add(atom1, atom2);

  group.position.x = Math.random() * 120 - 60;
  group.position.y = Math.random() * 120 - 60;
  group.position.z = -1 * Math.random() * 20;

  group.rotation.x = Math.random() * Math.PI * 2 - Math.PI;
  group.rotation.y = Math.random() * Math.PI * 2 - Math.PI;
  group.rotation.z = Math.random() * Math.PI * 2 - Math.PI;

  // Physics body.
  const radiusPhysicsBody = atomSizes["N"] * 1.2;
  const shape = new CANNON.Sphere(radiusPhysicsBody);
  const body = new CANNON.Body({
    mass: radiusPhysicsBody * radiusPhysicsBody,
    position: new CANNON.Vec3(0, 0, 0),
    shape: shape,
    material: defaultMaterial,
  });

  body.position.copy(group.position);

  world.addBody(body);
  scene.add(group);

  return {
    mesh: group,
    physicsBody: body,
    type: "N2",
  };
};

export const makeOxygen = (scene, world) => {
  const atom1 = new THREE.Mesh(geometries.O, materials.O);
  const atom2 = new THREE.Mesh(geometries.O, materials.O);

  atom1.position.x = -0.16;
  atom2.position.x = 0.16;

  const group = new THREE.Group();
  group.add(atom1, atom2);

  group.position.x = Math.random() * 120 - 60;
  group.position.y = Math.random() * 120 - 60;
  group.position.z = -1 * Math.random() * 20;

  group.rotation.x = Math.random() * Math.PI * 2 - Math.PI;
  group.rotation.y = Math.random() * Math.PI * 2 - Math.PI;
  group.rotation.z = Math.random() * Math.PI * 2 - Math.PI;

  // Physics body.
  const radiusPhysicsBody = atomSizes["O"] * 1.2;
  const shape = new CANNON.Sphere(radiusPhysicsBody);
  const body = new CANNON.Body({
    mass: radiusPhysicsBody * radiusPhysicsBody,
    position: new CANNON.Vec3(0, 0, 0),
    shape: shape,
    material: defaultMaterial,
  });

  body.position.copy(group.position);

  world.addBody(body);
  scene.add(group);

  return {
    mesh: group,
    physicsBody: body,
    type: "O",
  };
};

export const makeCarbon = (scene, world) => {
  const o1 = new THREE.Mesh(geometries.O, materials.O);
  o1.position.x = -0.54;

  const o2 = new THREE.Mesh(geometries.O, materials.O);
  o2.position.x = 0.54;

  const c = new THREE.Mesh(geometries.C, materials.C);
  const group = new THREE.Group();
  group.add(c, o1, o2);

  group.position.x = Math.random() * 120 - 60;
  group.position.y = Math.random() * 120 - 60;
  group.position.z = -1 * Math.random() * 20;

  group.rotation.x = Math.random() * Math.PI * 2 - Math.PI;
  group.rotation.y = Math.random() * Math.PI * 2 - Math.PI;
  group.rotation.z = Math.random() * Math.PI * 2 - Math.PI;

  // Physics body.
  const radiusPhysicsBody = atomSizes["C"] * 1.8;
  const shape = new CANNON.Sphere(radiusPhysicsBody);
  const body = new CANNON.Body({
    mass: radiusPhysicsBody * radiusPhysicsBody,
    position: new CANNON.Vec3(0, 0, 0),
    shape: shape,
    material: defaultMaterial,
  });

  body.position.copy(group.position);

  world.addBody(body);
  scene.add(group);

  return {
    mesh: group,
    physicsBody: body,
    type: "CO2",
  };
};

export const makeHydrogen = (scene, world) => {
  const h1 = new THREE.Mesh(geometries.H, materials.H);
  const h2 = new THREE.Mesh(geometries.H, materials.H);
  const o = new THREE.Mesh(geometries.O, materials.O);

  h1.position.x = 0.2 * Math.sin((52.2 * Math.PI) / 180);
  h1.position.y = -0.2 * Math.cos((52.2 * Math.PI) / 180);

  h2.position.x = -0.2 * Math.sin((52.2 * Math.PI) / 180);
  h2.position.y = -0.2 * Math.cos((52.2 * Math.PI) / 180);

  const group = new THREE.Group();
  group.add(o, h1, h2);

  group.position.x = Math.random() * 120 - 60;
  group.position.y = Math.random() * 120 - 60;
  group.position.z = -1 * Math.random() * 20;

  group.rotation.x = Math.random() * Math.PI * 2 - Math.PI;
  group.rotation.y = Math.random() * Math.PI * 2 - Math.PI;
  group.rotation.z = Math.random() * Math.PI * 2 - Math.PI;

  // Physics body.
  const radiusPhysicsBody = atomSizes["H"];
  const shape = new CANNON.Sphere(radiusPhysicsBody);
  const body = new CANNON.Body({
    mass: radiusPhysicsBody * radiusPhysicsBody,
    position: new CANNON.Vec3(0, 0, 0),
    shape: shape,
    material: defaultMaterial,
  });

  body.position.copy(group.position);

  world.addBody(body);
  scene.add(group);

  return {
    mesh: group,
    physicsBody: body,
    type: "H",
  };
};
