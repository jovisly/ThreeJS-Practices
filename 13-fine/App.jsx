import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Cloud, Clouds, Html, OrbitControls } from "@react-three/drei";

import * as Colors from "./colors";

import Dog from "./Dog";
import Fires from "./Fires";
import Furnitures from "./Furnitures";

export default function App() {
  return (
    <Canvas
      camera={{
        fov: 80,
        near: 0.1,
        far: 20,
        position: [0, 0.2, 1],
      }}
    >
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={0.8} />
      <ambientLight intensity={0.8} />

      {/* Floor */}
      <mesh position-y={-0.4} position-z={0} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[6, 2]} />
        <meshStandardMaterial color={Colors.brown400} wireframe={false} />
      </mesh>

      {/* Back wall */}
      <mesh position-z={-1} position-y={1.6}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial color={Colors.lime800} wireframe={false} />
      </mesh>

      {/* Smoke */}
      <Clouds material={THREE.MeshBasicMaterial} position-y={2}>
        <Cloud
          seed={66}
          segments={20}
          bounds={[2, 0.01, 1]}
          concentrate={"random"}
          volume={2}
          color={Colors.grey900}
          opacity={0.8}
          speed={0.7}
        />
      </Clouds>

      {/* Fires */}
      <Fires />

      {/* Furnitures */}
      <Furnitures />

      {/* Dog! */}
      <Dog />

      {/* References */}
      <Html wrapperClass="referenceText" position={[1.1, -0.8, 0]} center>
        3D Models from{" "}
        <a rel="noreferrer" target="_blank" href="https://poly.pizza/">
          Poly Pizza
        </a>{" "}
        with the following authors:
        <br />
        <a
          rel="noreferrer"
          target="_blank"
          href="https://poly.pizza/m/07qH3gO5K8L"
        >
          Dog
        </a>{" "}
        and{" "}
        <a
          rel="noreferrer"
          target="_blank"
          href="https://poly.pizza/m/49lEx3gLfn9"
        >
          Chair
        </a>{" "}
        by Poly by Google.
        <br />
        <a
          rel="noreferrer"
          target="_blank"
          href="https://poly.pizza/m/8RW134iS2gW"
        >
          Table
        </a>{" "}
        and{" "}
        <a
          rel="noreferrer"
          target="_blank"
          href="https://poly.pizza/m/62zn39CRkbG"
        >
          Framed picture
        </a>{" "}
        by jeremy.
        <br />
        <a
          rel="noreferrer"
          target="_blank"
          href="https://poly.pizza/m/NjrIKzZLYv"
        >
          Door
        </a>{" "}
        and{" "}
        <a
          rel="noreferrer"
          target="_blank"
          href="https://poly.pizza/m/M2sVC8jbmi"
        >
          Cup
        </a>{" "}
        by Kenney.
        <br />
        <a
          rel="noreferrer"
          target="_blank"
          href="https://poly.pizza/m/8FHt9iCkDtG"
        >
          Hat
        </a>{" "}
        by Minh Nguyen Tri.
        <br />
        <a
          rel="noreferrer"
          target="_blank"
          href="https://poly.pizza/m/1QpMTUO7P-G"
        >
          Fire
        </a>{" "}
        by Jakob Hippe.
        <br />
      </Html>
    </Canvas>
  );
}
