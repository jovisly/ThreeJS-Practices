import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

import Lights from "./Lights.jsx";
import Stage from "./Stage.jsx";
import Models from "./Models.jsx";

import * as Colors from "./colors.js";

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <color args={["#2B2E2F"]} attach="background" />

      <Physics debug={false} gravity={[0, -3, 0]}>
        <Lights />
        <Stage />
        <Models />
      </Physics>
    </>
  );
}
