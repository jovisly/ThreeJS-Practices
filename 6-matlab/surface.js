import * as THREE from "three";

const meshSize = 10;

const addSurface = (surfaceMaterial, wireframeMaterial, showWireframe) => {
  const group = new THREE.Group();
  const geometry = new THREE.PlaneGeometry(meshSize, meshSize, 128, 128);
  const geometrySparse = new THREE.PlaneGeometry(meshSize, meshSize, 64, 64);
  geometry.setAttribute(
    "aIsWireframe",
    new THREE.BufferAttribute(
      new Float32Array(geometry.attributes.position.count).fill(0.0),
      1
    )
  );

  // Add the wireframe on top of the plane
  const wireframeGeometry = new THREE.WireframeGeometry(geometrySparse);
  const wireframe = new THREE.LineSegments(
    wireframeGeometry,
    wireframeMaterial
  );
  wireframeGeometry.setAttribute(
    "aIsWireframe",
    new THREE.BufferAttribute(
      new Float32Array(wireframeGeometry.attributes.position.count).fill(1.0),
      1
    )
  );

  const mesh = new THREE.Mesh(geometry, surfaceMaterial);

  // Wireframe doesn't work very well because of z fighting.
  if (showWireframe) {
    group.add(mesh, wireframe);
  } else {
    group.add(mesh);
  }

  group.rotation.x = -Math.PI * 0.5;
  group.position.y += 0.2;
  group.position.y += (-0.8 * meshSize) / 2;
  return group;
};

export default addSurface;
