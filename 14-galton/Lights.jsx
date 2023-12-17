import { useRef } from "react";
import * as THREE from "three";

import { useHelper } from "@react-three/drei";
import { useControls } from "leva";

export default function Lights() {
  const directionalLightRef = useRef();
  const shadowCameraRef = useRef();

  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        castShadow
        position={[0, 6.4, 12]}
        intensity={2.4}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      ></directionalLight>
      <ambientLight intensity={1.2} />
    </>
  );
}
