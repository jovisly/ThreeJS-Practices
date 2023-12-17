import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

import Lights from "./Lights.jsx";
import Board from "./Board.jsx";
import Balls from "./Balls.jsx";

import * as Colors from "./colors.js";

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <color args={[Colors.blue200]} attach="background" />

      <Physics debug={false} gravity={[0, -9, 0]}>
        <Lights />
        <Board />
        <Balls />
      </Physics>
    </>
  );
}
