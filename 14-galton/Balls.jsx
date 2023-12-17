import { useState } from "react";

import * as THREE from "three";

import { Float, Text, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";

import * as Colors from "./colors.js";

const maxNumBalls = 120;
const secPerBall = 1;
const positions = [];

for (let i = 0; i < maxNumBalls; i++) {
  positions.push([
    0.01 + 0.4 * (Math.random() - 0.5),
    6 + 0.4 * (Math.random() - 0.5),
    -2.3 + 0.4 * (Math.random() - 0.5),
  ]);
}

const ballGeometry = new THREE.IcosahedronGeometry(0.2, 1);
const ballMaterial = new THREE.MeshStandardMaterial({
  color: Colors.orange800,
});

const OneBall = ({ index }) => {
  return (
    <RigidBody
      colliders="ball"
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <mesh
        position={positions[index]}
        geometry={ballGeometry}
        material={ballMaterial}
        castShadow
      />
    </RigidBody>
  );
};

export default function Balls() {
  const [numBalls, setNumBalls] = useState(1);

  useFrame((state, _delta) => {
    const time = state.clock.getElapsedTime();
    const currNumBalls = Math.floor(time / secPerBall);

    if (numBalls < currNumBalls && currNumBalls <= maxNumBalls) {
      setNumBalls((prev) => prev + 1);
    }
  });

  return (
    <>
      <Text position={[6, 6, 1]}>{maxNumBalls - numBalls}</Text>

      {Array.from(Array(numBalls).keys()).map((index) => (
        <OneBall key={index} index={index} />
      ))}
    </>
  );
}
