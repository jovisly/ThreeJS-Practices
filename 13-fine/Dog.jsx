import { Html, useGLTF } from "@react-three/drei";

export default function Dog() {
  const modelDog = useGLTF("/13-fine/dog.glb");
  const modelHat = useGLTF("/13-fine/hat.glb");

  return (
    <>
      <primitive
        object={modelDog.scene}
        scale={0.09}
        rotation-y={-1.2}
        position-x={-0.05}
        position-y={-0.14}
        position-z={-0.05}
      >
        <Html
          wrapperClass="dialog"
          position={[-3, 8, 5]}
          // center
          distanceFactor={8}
        >
          THIS IS FINE
        </Html>
      </primitive>
      <primitive
        object={modelHat.scene}
        scale={0.4}
        rotation-y={4}
        position-x={0.15}
        position-y={-0.09}
        position-z={0.27}
      />
    </>
  );
}

useGLTF.preload("/13-fine/dog.glb");
useGLTF.preload("/13-fine/hat.glb");
