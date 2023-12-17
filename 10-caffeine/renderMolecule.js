import { PDBLoader } from "three/addons/loaders/PDBLoader.js";
import * as THREE from "three";
import * as Colors from "./colors.js";

const atomScale = 0.016;
const atomSizes = {
  N: 56 * atomScale,
  C: 67 * atomScale,
  O: 48 * atomScale,
  S: 88 * atomScale,
  H: 53 * atomScale,
};

const atomColors = {
  N: Colors.blue600,
  C: Colors.grey700,
  O: Colors.orange300,
  H: Colors.pink200,
};

const pdbLoader = new PDBLoader();
const offset = new THREE.Vector3();

export default function renderMolecule(rootGroup, format) {
  const numColors = 3;
  const gradientColors = new Uint8Array(numColors);

  for (let c = 0; c <= gradientColors.length; c++) {
    gradientColors[c] = (c / gradientColors.length) * 256;
  }

  const gradientMap = new THREE.DataTexture(
    gradientColors,
    gradientColors.length,
    1,
    format
  );
  gradientMap.needsUpdate = true;

  const model = "caffeine.pdb";
  const url = "/10-caffeine/" + model;

  pdbLoader.load(url, (pdb) => {
    const geometryAtoms = pdb.geometryAtoms;
    const geometryBonds = pdb.geometryBonds;
    const json = pdb.json;

    const sphereGeometry = new THREE.IcosahedronGeometry(1, 3);

    geometryAtoms.computeBoundingBox();
    geometryAtoms.boundingBox.getCenter(offset).negate();

    geometryAtoms.translate(offset.x, offset.y, offset.z);
    geometryBonds.translate(offset.x, offset.y, offset.z);

    let positions = geometryAtoms.getAttribute("position");
    const position = new THREE.Vector3();

    for (let i = 0; i < positions.count; i++) {
      position.x = positions.getX(i);
      position.y = positions.getY(i);
      position.z = positions.getZ(i);

      const atom = json.atoms[i];
      const atomType = atom[4];

      const material = new THREE.MeshToonMaterial({
        color: atomColors[atomType],
        gradientMap: gradientMap,
      });

      material.userData.outlineParameters = {
        thickness: 0.004,
        color: [0, 0, 0],
        alpha: 1,
        visible: true,
        keepAlive: true,
      };

      const object = new THREE.Mesh(sphereGeometry, material);
      object.position.copy(position);
      object.position.multiplyScalar(70);
      object.scale.multiplyScalar(60);

      object.scale.multiplyScalar(atomSizes[atomType]);
      rootGroup.add(object);
    }
  });
}
