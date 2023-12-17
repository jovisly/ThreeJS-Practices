import { Suspense, useEffect, useRef } from "react";
import { suspend } from "suspend-react";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { createAudio } from "./utils";

export default function App() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1, 2], fov: 18 }}>
      <OrbitControls makeDefault />

      <spotLight
        position={[-4, 4, -4]}
        angle={0.06}
        penumbra={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <Suspense fallback={null}>
        <Track position-z={0} url="/11-canon/canon.mp3" />
      </Suspense>
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.025, 0]}
      >
        <planeGeometry color="red" />
        <shadowMaterial transparent opacity={0.15} />
      </mesh>
    </Canvas>
  );
}

function Track({
  url,
  y = 2500,
  space = 1.8,
  width = 0.01,
  height = 0.05,
  obj = new THREE.Object3D(),
  ...props
}) {
  const instanceMeshRef = useRef();
  const { gain, context, update, data } = suspend(
    () => createAudio(url),
    [url]
  );

  useEffect(() => {
    gain.connect(context.destination);
    return () => gain.disconnect();
  }, [gain, context]);

  useFrame((_state, _delta) => {
    let avg = update();
    for (let i = 0; i < data.length; i++) {
      obj.position.set(
        i * width * space - (data.length * width * space) / 2,
        1.8 * (data[i] / y),
        0
      );
      obj.updateMatrix();
      instanceMeshRef.current.setMatrixAt(i, obj.matrix);
    }
    instanceMeshRef.current.material.color.setHSL(avg / 160, 0.6, 0.6);
    instanceMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      castShadow
      ref={instanceMeshRef}
      args={[null, null, data.length]}
      {...props}
    >
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial toneMapped={false} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}
