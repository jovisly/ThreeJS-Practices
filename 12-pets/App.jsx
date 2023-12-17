import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";

import Axes from "./Axes";
import Models from "./Models";
import Bars from "./Bars";
import Title from "./Title";

export default function App() {
  return (
    <Canvas>
      <Stage shadows="accumulative" intensity={1}>
        <OrbitControls makeDefault />

        <Axes />
        <Models />
        <Bars />
        <Title />
      </Stage>
    </Canvas>
  );
}
