import { useEffect, useRef } from "react";
import * as THREE from "three";

import { useFrame } from "@react-three/fiber";
import { Clone, useGLTF } from "@react-three/drei";

export default function Fires() {
  const modelFire = useGLTF("/13-fine/fire.glb");

  const fire1Ref = useRef();
  const fire2Ref = useRef();
  const fire3Ref = useRef();

  const totalTimeRef = useRef(0);

  useFrame((_state, delta) => {
    totalTimeRef.current += delta;

    // Rotations.
    fire1Ref.current.rotation.y =
      Math.PI * Math.sin(totalTimeRef.current * 0.2);

    fire2Ref.current.rotation.y =
      -1 * Math.PI * Math.sin(totalTimeRef.current * 0.3 + 0.8);

    fire3Ref.current.rotation.y =
      -1 * Math.PI * Math.sin(totalTimeRef.current * 0.1 + 0.2);

    // Displacements.
    fire1Ref.current.position.x += 0.004 * (Math.random() - 0.5);
    fire1Ref.current.position.y += 0.002 * (Math.random() - 0.5);
    fire1Ref.current.position.z += 0.004 * (Math.random() - 0.5);

    fire2Ref.current.position.x += 0.004 * (Math.random() - 0.5);
    fire2Ref.current.position.y += 0.002 * (Math.random() - 0.5);
    fire2Ref.current.position.z += 0.004 * (Math.random() - 0.5);

    fire3Ref.current.position.x += 0.004 * (Math.random() - 0.5);
    fire3Ref.current.position.y += 0.002 * (Math.random() - 0.5);
    fire3Ref.current.position.z += 0.004 * (Math.random() - 0.5);
  });

  return (
    <>
      {/* Right Front */}
      <Clone
        ref={fire1Ref}
        object={modelFire.scene}
        scale={1}
        rotation-z={0.3}
        position-x={0.2}
        position-y={-0.26}
        position-z={0.4}
      />

      {/* Right Back */}
      <Clone
        ref={fire2Ref}
        object={modelFire.scene}
        scale={3.2}
        rotation-z={0.3}
        position-x={1.2}
        position-y={0}
        position-z={-0.6}
      />

      {/* Big one one the left */}
      <Clone
        ref={fire3Ref}
        object={modelFire.scene}
        scale={2.2}
        rotation-z={0.3}
        position-x={-0.8}
        position-y={-0.09}
        position-z={0.1}
      />
    </>
  );
}

useGLTF.preload("/13-fine/fire.glb");
