import { useMemo, useRef, useState } from "react";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { CylinderCollider, RigidBody } from "@react-three/rapier";

import * as Colors from "./colors.js";

const pegGometry = new THREE.CylinderGeometry(0.12, 0.12, 1);
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floorMaterial = new THREE.MeshStandardMaterial({
  color: Colors.green600,
});
const coverMaterial = new THREE.MeshStandardMaterial({
  wireframe: true,
  color: "white",
});
const wallMaterial = floorMaterial;
const dividerMaterial = new THREE.MeshStandardMaterial({
  color: Colors.green900,
});
const pegMaterial = new THREE.MeshStandardMaterial({
  color: Colors.grey700,
});

const widthDivider = 10 / 13;
const pegDivider = widthDivider * 1.4;

function Floor() {
  return (
    <RigidBody
      type="fixed"
      restitution={0.8}
      friction={1}
      rotation={[20, 0, 0]}
    >
      {/* Floor */}
      <mesh
        geometry={boxGeometry}
        material={floorMaterial}
        position={[0, 0, 0]}
        scale={[10, 0.1, 14]}
        receiveShadow
      />
      {/* Cover */}
      <mesh
        geometry={boxGeometry}
        material={coverMaterial}
        position={[0, 1, 0]}
        scale={[10, 0.1, 14]}
      />
    </RigidBody>
  );
}

function OnePeg({ position }) {
  return (
    <RigidBody
      type="fixed"
      restitution={0.8}
      friction={1}
      colliders={false}
      position={position}
    >
      <CylinderCollider args={[0.5, 0.12]} />
      {/* Pegs */}
      <mesh
        geometry={pegGometry}
        material={pegMaterial}
        scale={[1, 1, 1]}
        castShadow
      />
    </RigidBody>
  );
}

function Pegs() {
  return (
    <group rotation={[20, 0, 0]}>
      <OnePeg position={[pegDivider / 2, 0.5, -5 * pegDivider]} />
      <OnePeg position={[-pegDivider / 2, 0.5, -5 * pegDivider]} />
      <OnePeg position={[(3 * pegDivider) / 2, 0.5, -5 * pegDivider]} />
      <OnePeg position={[(-3 * pegDivider) / 2, 0.5, -5 * pegDivider]} />
      <OnePeg position={[(5 * pegDivider) / 2, 0.5, -5 * pegDivider]} />
      <OnePeg position={[(-5 * pegDivider) / 2, 0.5, -5 * pegDivider]} />
      <OnePeg position={[(7 * pegDivider) / 2, 0.5, -5 * pegDivider]} />
      <OnePeg position={[(-7 * pegDivider) / 2, 0.5, -5 * pegDivider]} />

      <OnePeg position={[0, 0.5, -4 * pegDivider]} />
      <OnePeg position={[pegDivider, 0.5, -4 * pegDivider]} />
      <OnePeg position={[-pegDivider, 0.5, -4 * pegDivider]} />
      <OnePeg position={[2 * pegDivider, 0.5, -4 * pegDivider]} />
      <OnePeg position={[-2 * pegDivider, 0.5, -4 * pegDivider]} />
      <OnePeg position={[3 * pegDivider, 0.5, -4 * pegDivider]} />
      <OnePeg position={[-3 * pegDivider, 0.5, -4 * pegDivider]} />
      <OnePeg position={[4 * pegDivider, 0.5, -4 * pegDivider]} />
      <OnePeg position={[-4 * pegDivider, 0.5, -4 * pegDivider]} />

      <OnePeg position={[pegDivider / 2, 0.5, -3 * pegDivider]} />
      <OnePeg position={[-pegDivider / 2, 0.5, -3 * pegDivider]} />
      <OnePeg position={[(3 * pegDivider) / 2, 0.5, -3 * pegDivider]} />
      <OnePeg position={[(-3 * pegDivider) / 2, 0.5, -3 * pegDivider]} />
      <OnePeg position={[(5 * pegDivider) / 2, 0.5, -3 * pegDivider]} />
      <OnePeg position={[(-5 * pegDivider) / 2, 0.5, -3 * pegDivider]} />
      <OnePeg position={[(7 * pegDivider) / 2, 0.5, -3 * pegDivider]} />
      <OnePeg position={[(-7 * pegDivider) / 2, 0.5, -3 * pegDivider]} />

      <OnePeg position={[0, 0.5, -2 * pegDivider]} />
      <OnePeg position={[pegDivider, 0.5, -2 * pegDivider]} />
      <OnePeg position={[-pegDivider, 0.5, -2 * pegDivider]} />
      <OnePeg position={[2 * pegDivider, 0.5, -2 * pegDivider]} />
      <OnePeg position={[-2 * pegDivider, 0.5, -2 * pegDivider]} />
      <OnePeg position={[3 * pegDivider, 0.5, -2 * pegDivider]} />
      <OnePeg position={[-3 * pegDivider, 0.5, -2 * pegDivider]} />
      <OnePeg position={[4 * pegDivider, 0.5, -2 * pegDivider]} />
      <OnePeg position={[-4 * pegDivider, 0.5, -2 * pegDivider]} />

      <OnePeg position={[pegDivider / 2, 0.5, -pegDivider]} />
      <OnePeg position={[-pegDivider / 2, 0.5, -pegDivider]} />
      <OnePeg position={[(3 * pegDivider) / 2, 0.5, -pegDivider]} />
      <OnePeg position={[(-3 * pegDivider) / 2, 0.5, -pegDivider]} />
      <OnePeg position={[(5 * pegDivider) / 2, 0.5, -pegDivider]} />
      <OnePeg position={[(-5 * pegDivider) / 2, 0.5, -pegDivider]} />
      <OnePeg position={[(7 * pegDivider) / 2, 0.5, -pegDivider]} />
      <OnePeg position={[(-7 * pegDivider) / 2, 0.5, -pegDivider]} />

      <OnePeg position={[0, 0.5, 0]} />
      <OnePeg position={[pegDivider, 0.5, 0]} />
      <OnePeg position={[-pegDivider, 0.5, 0]} />
      <OnePeg position={[2 * pegDivider, 0.5, 0]} />
      <OnePeg position={[-2 * pegDivider, 0.5, 0]} />
      <OnePeg position={[3 * pegDivider, 0.5, 0]} />
      <OnePeg position={[-3 * pegDivider, 0.5, 0]} />
      <OnePeg position={[4 * pegDivider, 0.5, 0]} />
      <OnePeg position={[-4 * pegDivider, 0.5, 0]} />
    </group>
  );
}

function Walls() {
  return (
    <RigidBody
      type="fixed"
      restitution={0.8}
      friction={1}
      rotation={[20, 0, 0]}
    >
      {/* Bottom */}
      <mesh
        position={[0, 0.5, 7]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[10.1, 1, 0.1]}
        castShadow
      />

      {/* Top */}
      <mesh
        position={[0, 0.5, -7]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[10.1, 1, 0.1]}
        castShadow
      />

      {/* Left */}
      <mesh
        position={[-5, 0.5, 0]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[0.1, 1, 14]}
        castShadow
      />

      {/* Right */}
      <mesh
        position={[5, 0.5, 0]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[0.1, 1, 14]}
        castShadow
      />
    </RigidBody>
  );
}

function Cups() {
  return (
    <RigidBody
      type="fixed"
      restitution={0.8}
      friction={1}
      rotation={[20, 0, 0]}
    >
      {/* Cups */}
      <mesh
        position={[-5 + widthDivider, 0.5, 4.9]}
        geometry={boxGeometry}
        material={dividerMaterial}
        scale={[0.05, 1, 3.6]}
        castShadow
      />

      <mesh
        position={[-5 + widthDivider * 2, 0.5, 4.9]}
        geometry={boxGeometry}
        material={dividerMaterial}
        scale={[0.05, 1, 3.6]}
        castShadow
      />

      <mesh
        position={[-5 + widthDivider * 3, 0.5, 4.9]}
        geometry={boxGeometry}
        material={dividerMaterial}
        scale={[0.05, 1, 3.6]}
        castShadow
      />

      <mesh
        position={[-5 + widthDivider * 4, 0.5, 4.9]}
        geometry={boxGeometry}
        material={dividerMaterial}
        scale={[0.05, 1, 3.6]}
        castShadow
      />

      <mesh
        position={[-5 + widthDivider * 5, 0.5, 4.9]}
        geometry={boxGeometry}
        material={dividerMaterial}
        scale={[0.05, 1, 3.6]}
        castShadow
      />

      <mesh
        position={[-5 + widthDivider * 6, 0.5, 4.9]}
        geometry={boxGeometry}
        material={dividerMaterial}
        scale={[0.05, 1, 3.6]}
        castShadow
      />

      <mesh
        position={[-5 + widthDivider * 7, 0.5, 4.9]}
        geometry={boxGeometry}
        material={dividerMaterial}
        scale={[0.05, 1, 3.6]}
        castShadow
      />

      <mesh
        position={[-5 + widthDivider * 8, 0.5, 4.9]}
        geometry={boxGeometry}
        material={dividerMaterial}
        scale={[0.05, 1, 3.6]}
        castShadow
      />

      <mesh
        position={[-5 + widthDivider * 9, 0.5, 4.9]}
        geometry={boxGeometry}
        material={dividerMaterial}
        scale={[0.05, 1, 3.6]}
        castShadow
      />

      <mesh
        position={[-5 + widthDivider * 10, 0.5, 4.9]}
        geometry={boxGeometry}
        material={dividerMaterial}
        scale={[0.05, 1, 3.6]}
        castShadow
      />

      <mesh
        position={[-5 + widthDivider * 11, 0.5, 4.9]}
        geometry={boxGeometry}
        material={dividerMaterial}
        scale={[0.05, 1, 3.6]}
        castShadow
      />

      <mesh
        position={[-5 + widthDivider * 12, 0.5, 4.9]}
        geometry={boxGeometry}
        material={dividerMaterial}
        scale={[0.05, 1, 3.6]}
        castShadow
      />
    </RigidBody>
  );
}

export default function Board() {
  return (
    <>
      <Floor />
      <Walls />
      <Cups />
      <Pegs />
    </>
  );
}
