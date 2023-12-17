import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";

import Experience from "./Experience.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 4, 20],
      }}
    >
      <Perf position="top-left" />
      <Experience />
    </Canvas>
  </>
);
