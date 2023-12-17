// Based on https://codesandbox.io/s/wu51m?file=/src/index.js:155-530
// From https://docs.pmnd.rs/react-three-fiber/getting-started/examples
import { useState } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./style.css";

function Overlay() {
  const [isReady, setIsReady] = useState(false);
  return (
    <>
      {isReady && <App />}
      <div
        className={`fullscreen bg ${isReady ? "ready" : "notready"} ${
          isReady && "clicked"
        }`}
      >
        <div className="stack">
          <button onClick={() => setIsReady(true)}>{"▶️ Play"}</button>
        </div>

        <div className="reference-text">
          Based on the{" "}
          <a
            rel="noreferrer"
            target="_blank"
            href="https://docs.pmnd.rs/react-three-fiber/getting-started/examples"
          >
            Simple audio analyser example
          </a>
          <br />
          Music from{" "}
          <a
            rel="noreferrer"
            target="_blank"
            href="https://archive.org/details/canonindpachelbel"
          >
            archive.org
          </a>
        </div>
      </div>
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Overlay />);
