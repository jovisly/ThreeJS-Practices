import { useEffect, useRef } from "react";
import * as THREE from "three";

import { useFrame, useLoader } from "@react-three/fiber";
import { Text3D, useGLTF } from "@react-three/drei";

const textProps = {
  font: "/12-pets/font/helvetiker_regular.typeface.json",
  size: 0.6,
  height: 0.1,
  curveSegments: 12,
  bevelEnabled: true,
  bevelThickness: 0.02,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 5,
};

export default function Models() {
  const dogBarRef = useRef();
  const catBarRef = useRef();
  const goatBarRef = useRef();
  const pigBarRef = useRef();

  const pigTextRef = useRef();

  const mapUrl = "/12-pets/C28E4E_845119_0B0805_713C0C-512px.png";
  const [matcapTexture] = useLoader(THREE.TextureLoader, [mapUrl]);

  const modelDog = useGLTF("/12-pets/beagle.glb");
  const modelCat = useGLTF("/12-pets/cat.glb");
  const modelGoat = useGLTF("/12-pets/goat.glb");
  const modelPig = useGLTF("/12-pets/pig.glb");

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;
  }, []);

  useFrame((_state, delta) => {
    dogBarRef.current.rotation.y += 0.7 * delta;
    catBarRef.current.rotation.y += 0.7 * delta;
    pigBarRef.current.rotation.y += 0.7 * delta;
    goatBarRef.current.rotation.y += 0.7 * delta;
  });

  return (
    <>
      <primitive
        ref={pigBarRef}
        object={modelPig.scene}
        scale={0.012}
        rotation-y={-1.6}
        position-x={-4.2}
        position-y={-4.4}
      />
      <Text3D {...textProps} position={[-4.6, -3.1, 0]} ref={pigTextRef}>
        Pig
        <meshMatcapMaterial matcap={matcapTexture} />
      </Text3D>

      <primitive
        ref={goatBarRef}
        object={modelGoat.scene}
        scale={0.3}
        rotation-y={-1.6}
        position-x={-0.8}
        position-y={-5.5}
      />
      <Text3D {...textProps} position={[-1.7, -3.1, 0]}>
        Goat
        <meshMatcapMaterial matcap={matcapTexture} />
      </Text3D>

      <primitive
        ref={catBarRef}
        object={modelCat.scene}
        scale={0.026}
        rotation-y={-1.6}
        position-x={2.4}
        position-y={-4.4}
      />
      <Text3D {...textProps} position={[1.8, -3.1, 0]}>
        Cat
        <meshMatcapMaterial matcap={matcapTexture} />
      </Text3D>

      <primitive
        ref={dogBarRef}
        object={modelDog.scene}
        scale={0.02}
        rotation-y={-1.6}
        position-x={5.6}
        position-y={-4.4}
      />
      <Text3D {...textProps} position={[4.8, -3.1, 0]}>
        Dog
        <meshMatcapMaterial matcap={matcapTexture} />
      </Text3D>
    </>
  );
}

useGLTF.preload("/12-pets/beagle.glb");
useGLTF.preload("/12-pets/cat.glb");
useGLTF.preload("/12-pets/goat.glb");
useGLTF.preload("/12-pets/pig.glb");
