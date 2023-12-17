import { useGLTF } from "@react-three/drei";

export default function Funitures() {
  const modelTable = useGLTF("/13-fine/table.glb");
  const modelChair = useGLTF("/13-fine/chair.glb");
  const modelCup = useGLTF("/13-fine/cup.glb");
  const modelPicture = useGLTF("/13-fine/picture.glb");
  const modelDoor = useGLTF("/13-fine/door.glb");

  return (
    <>
      <primitive
        object={modelTable.scene}
        scale={0.05}
        position-x={0.7}
        position-y={-0.4}
        position-z={-0.1}
      />

      <primitive
        object={modelChair.scene}
        scale={0.05}
        rotation-y={-0.5}
        position-x={-0.1}
        position-y={-0.4}
        position-z={-0.1}
      />

      <primitive
        object={modelCup.scene}
        scale={0.5}
        position-x={0.48}
        position-y={-0.007}
        position-z={-0.1}
      />

      <primitive
        object={modelPicture.scene}
        scale={0.04}
        rotation-y={Math.PI}
        position-x={0.94}
        position-y={0.4}
        position-z={-0.96}
      />

      <primitive
        object={modelDoor.scene}
        scale={1.6}
        rotation-y={Math.PI}
        position-x={-1}
        position-y={-0.4}
        position-z={-0.8}
      />
    </>
  );
}

useGLTF.preload("/13-fine/table.glb");
useGLTF.preload("/13-fine/chair.glb");
useGLTF.preload("/13-fine/cup.glb");
useGLTF.preload("/13-fine/picture.glb");
useGLTF.preload("/13-fine/door.glb");
