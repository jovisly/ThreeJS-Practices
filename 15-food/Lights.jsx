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
        castShadow
        position={[4, 4, 1]}
        intensity={2.2}
        shadow-mapSize={[512, 512]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      ></directionalLight>

      <directionalLight
        castShadow
        position={[-4, 4, 1]}
        intensity={1.6}
        shadow-mapSize={[512, 512]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={1.5} />
    </>
  );
}
