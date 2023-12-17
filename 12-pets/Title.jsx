import { useEffect, useState } from "react";
import { Html } from "@react-three/drei";

export default function Title() {
  const [showRef, setShowRef] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowRef(true);
    }, 15_000);
  }, []);

  return (
    <>
      <Html wrapperClass="plotTitle" position={[0, 7.2, 0]} center>
        Number of Licensed Pets by Type <br /> in Seattle in 2022
      </Html>

      {showRef && (
        <Html wrapperClass="referenceText" position={[6.6, -8.9, 0]} center>
          3D Models by Poly by Google via Poly Pizza (https://poly.pizza/).
          <br />
          Data source: Seattle Open Data (https://data.seattle.gov){" "}
        </Html>
      )}
    </>
  );
}
