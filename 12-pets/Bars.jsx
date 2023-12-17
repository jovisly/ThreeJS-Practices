import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";

import * as Colors from "./colors";

const initialY = -1.7;
const initialHeight = 0.1;

const numDog = 11842;
const numCat = 5455;
const numGoat = 12;
const numPig = 1;

const maxScaleDog = 60;
const maxScaleCat = maxScaleDog * (numCat / numDog);
const maxScaleGoat = maxScaleDog * (numGoat / numDog);
const maxScalePig = maxScaleDog * (numPig / numDog);

const barProps = {
  args: [1.4, initialHeight, 0.6],
  radius: 0.05,
  smoothness: 4,
  bevelSegments: 4,
  creaseAngle: 0.4,
  visible: false,
};

export default function Bars() {
  const stage = useRef(0);

  const dogBarRef = useRef();
  const dogHtmlRef = useRef();
  const dogValRef = useRef(0);

  const catBarRef = useRef();
  const catHtmlRef = useRef();
  const catValRef = useRef(0);

  const goatBarRef = useRef();
  const goatHtmlRef = useRef();
  const goatValRef = useRef(0);

  const pigBarRef = useRef();
  const pigHtmlRef = useRef();
  const pigValRef = useRef(0);

  const pauseRef = useRef(0);

  useFrame((_state, delta) => {
    if (stage.current === 0) {
      pigHtmlRef.current.style.display = "none";
      goatHtmlRef.current.style.display = "none";
      catHtmlRef.current.style.display = "none";
      dogHtmlRef.current.style.display = "none";

      if (pauseRef.current >= 140) {
        stage.current = 1;
        pigBarRef.current.visible = true;
        pauseRef.current = 0;
      } else {
        pauseRef.current += 1;
      }
    }

    // Pig
    if (stage.current === 1) {
      pigHtmlRef.current.style.display = "block";

      if (pigValRef.current < numPig) {
        pigValRef.current += Math.round((delta * 10 * numPig) / maxScalePig);
        if (pigValRef.current > numPig) {
          pigValRef.current = numPig;
        }
        pigHtmlRef.current.textContent =
          "🐷 " + pigValRef.current.toLocaleString();
        pigHtmlRef.current.style.transform = `translateY(-${
          72 + pigBarRef.current.scale.y * 3.4
        }px)`;
      } else {
        if (pauseRef.current >= 60) {
          stage.current = 2;
          goatBarRef.current.visible = true;
          pauseRef.current = 0;
        } else {
          pauseRef.current += 1;
        }
      }

      if (pigBarRef.current.scale.y < maxScalePig) {
        pigBarRef.current.scale.y += delta * 10;
        pigBarRef.current.position.y =
          (initialHeight * (pigBarRef.current.scale.y - 1)) / 2 + initialY;
      }
    }

    // Goat
    if (stage.current === 2) {
      goatHtmlRef.current.style.display = "block";

      if (goatValRef.current < numGoat) {
        goatValRef.current += Math.round((delta * 10 * numGoat) / maxScaleGoat);
        if (goatValRef.current > numGoat) {
          goatValRef.current = numGoat;
        }
        goatHtmlRef.current.textContent =
          "🐐 " + goatValRef.current.toLocaleString();
        goatHtmlRef.current.style.transform = `translateY(-${
          72 + goatBarRef.current.scale.y * 3.4
        }px)`;
      } else {
        if (pauseRef.current >= 60) {
          stage.current = 3;
          catBarRef.current.visible = true;
          pauseRef.current = 0;
        } else {
          pauseRef.current += 1;
        }
      }

      if (goatBarRef.current.scale.y < maxScaleGoat) {
        goatBarRef.current.scale.y += delta * 10;
        goatBarRef.current.position.y =
          (initialHeight * (goatBarRef.current.scale.y - 1)) / 2 + initialY;
      }
    }

    // Cat
    if (stage.current === 3) {
      catHtmlRef.current.style.display = "block";

      if (catValRef.current < numCat) {
        catValRef.current += Math.round((delta * 10 * numCat) / maxScaleCat);
        if (catValRef.current > numCat) {
          catValRef.current = numCat;
        }
        catHtmlRef.current.textContent =
          "🐱 " + catValRef.current.toLocaleString();
        catHtmlRef.current.style.transform = `translateY(-${
          72 + catBarRef.current.scale.y * 3.4
        }px)`;
      } else {
        if (pauseRef.current >= 60) {
          stage.current = 4;
          dogBarRef.current.visible = true;
          pauseRef.current = 0;
        } else {
          pauseRef.current += 1;
        }
      }

      if (catBarRef.current.scale.y < maxScaleCat) {
        catBarRef.current.scale.y += delta * 10;
        catBarRef.current.position.y =
          (initialHeight * (catBarRef.current.scale.y - 1)) / 2 + initialY;
      }
    }

    // Dog
    if (stage.current === 4) {
      dogHtmlRef.current.style.display = "block";

      if (dogValRef.current < numDog) {
        dogValRef.current += Math.round((delta * 10 * numDog) / maxScaleDog);
        if (dogValRef.current > numDog) {
          dogValRef.current = numDog;
        }
        dogHtmlRef.current.textContent =
          "🐶 " + dogValRef.current.toLocaleString();
        dogHtmlRef.current.style.transform = `translateY(-${
          72 + dogBarRef.current.scale.y * 3.4
        }px)`;
      } else {
        stage.current = -1;
      }

      if (dogBarRef.current.scale.y < maxScaleDog) {
        dogBarRef.current.scale.y += delta * 10;
        dogBarRef.current.position.y =
          (initialHeight * (dogBarRef.current.scale.y - 1)) / 2 + initialY;
      }
    }
  });

  return (
    <>
      <RoundedBox ref={pigBarRef} {...barProps} position={[-4, initialY, 0]}>
        <meshStandardMaterial color={Colors.pink200} />
        <Html
          ref={pigHtmlRef}
          wrapperClass="number"
          position={[-0.4, 0, 0]}
        ></Html>
      </RoundedBox>

      <RoundedBox ref={goatBarRef} {...barProps} position={[-0.8, initialY, 0]}>
        <meshStandardMaterial color={Colors.brown700} />
        <Html
          ref={goatHtmlRef}
          wrapperClass="number"
          position={[-0.5, 0, 0]}
        ></Html>
      </RoundedBox>

      <RoundedBox ref={catBarRef} {...barProps} position={[2.4, initialY, 0]}>
        <meshStandardMaterial color={Colors.grey500} />
        <Html
          ref={catHtmlRef}
          wrapperClass="number"
          position={[-0.7, 0, 0]}
        ></Html>
      </RoundedBox>

      <RoundedBox ref={dogBarRef} {...barProps} position={[5.4, initialY, 0]}>
        <meshStandardMaterial color={Colors.orange800} />
        <Html
          ref={dogHtmlRef}
          wrapperClass="number"
          position={[-0.7, 0, 0]}
        ></Html>
      </RoundedBox>
    </>
  );
}
