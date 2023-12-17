import { createRoot } from "react-dom/client";

import App from "./App";
import "./style.css";

function Overlay() {
  const isReady = true;
  return <>{isReady && <App />}</>;
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Overlay />);
