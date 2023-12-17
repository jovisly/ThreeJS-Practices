import * as THREE from "three";

import { useLoader } from "@react-three/fiber";
import { Cone, Cylinder, Sphere } from "@react-three/drei";

const axesLength = 8;
const xAxisLength = axesLength * 1.7;
const yAxisLength = axesLength * 0.8;

export default function Axes() {
  const mapUrl = "/12-pets/C28E4E_845119_0B0805_713C0C-512px.png";
  const [matcapTexture] = useLoader(THREE.TextureLoader, [mapUrl]);

  return (
    <group position-x={-6} position-y={-2}>
      <Sphere args={[0.1, 16, 16]}>
        <meshMatcapMaterial matcap={matcapTexture} />
      </Sphere>

      {/* y axis */}
      <Cylinder args={[0.05, 0.05, yAxisLength]} position-y={yAxisLength / 2}>
        <meshMatcapMaterial matcap={matcapTexture} />
      </Cylinder>

      <Cone args={[0.1, 0.3]} position-y={yAxisLength}>
        <meshMatcapMaterial matcap={matcapTexture} />
      </Cone>

      {/* x axis */}
      <Cylinder
        args={[0.05, 0.05, xAxisLength]}
        position-x={xAxisLength / 2}
        rotation-z={Math.PI / 2}
      >
        <meshMatcapMaterial matcap={matcapTexture} />
      </Cylinder>
      <Cone
        args={[0.1, 0.3]}
        position-x={xAxisLength}
        rotation-z={-Math.PI / 2}
      >
        <meshMatcapMaterial matcap={matcapTexture} />
      </Cone>
    </group>
  );
}
