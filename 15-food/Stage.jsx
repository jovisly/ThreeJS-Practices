import { useMemo, useRef, useState } from "react";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { CylinderCollider, RigidBody } from "@react-three/rapier";

import * as Colors from "./colors.js";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: Colors.green500,
});

export default function Stage() {
  return (
    <RigidBody
      type="fixed"
      restitution={0.1}
      friction={0.2}
      rotation={[Math.PI * 0.5, 0, 0]}
      position={[0, -1, 0]}
    >
      {/* Floor */}
      <mesh
        receiveShadow
        rotation-x={-Math.PI * 0.5}
        geometry={boxGeometry}
        material={floorMaterial}
        scale={[16, 0.1, 16]}
      />
    </RigidBody>
  );
}
