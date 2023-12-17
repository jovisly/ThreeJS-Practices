import * as THREE from "three";

import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import useFoodStore from "./stores/useFoodStore.jsx";

const OneModel = ({ id, type, x, z, rotationX, rotationY, rotationZ }) => {
  const model = useGLTF(`/15-food/${type}.glb`);

  model.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
    }
  });

  return (
    <RigidBody
      key={id}
      colliders="hull"
      position={[x, 6, z]}
      restitution={0.1}
      friction={0.2}
      rotation={[rotationX, rotationY, rotationZ]}
    >
      <primitive object={model.scene.clone()} scale={3} />
    </RigidBody>
  );
};

export default function Modals() {
  const foods = useFoodStore((state) => state.foods);

  return (
    <>
      {foods.map((food) => (
        <OneModel
          key={food.id}
          id={food.id}
          type={food.type}
          x={food.x}
          z={food.z}
          rotationX={food.rotationX}
          rotationY={food.rotationY}
          rotationZ={food.rotationZ}
        />
      ))}
    </>
  );
}

useGLTF.preload("/15-food/apple.glb");
useGLTF.preload("/15-food/avocado.glb");
useGLTF.preload("/15-food/banana.glb");
useGLTF.preload("/15-food/beet.glb");
useGLTF.preload("/15-food/bowl.glb");
useGLTF.preload("/15-food/bread.glb");
useGLTF.preload("/15-food/burger.glb");
useGLTF.preload("/15-food/cabbage.glb");
useGLTF.preload("/15-food/cake.glb");
useGLTF.preload("/15-food/carrot.glb");
useGLTF.preload("/15-food/cauliflower.glb");
useGLTF.preload("/15-food/cherries.glb");
useGLTF.preload("/15-food/chinese.glb");
useGLTF.preload("/15-food/chocolate.glb");
useGLTF.preload("/15-food/cocktail.glb");
useGLTF.preload("/15-food/coconut.glb");
useGLTF.preload("/15-food/corn.glb");
useGLTF.preload("/15-food/cornDog.glb");
useGLTF.preload("/15-food/croissant.glb");
useGLTF.preload("/15-food/cupcake.glb");
useGLTF.preload("/15-food/donut.glb");
useGLTF.preload("/15-food/eggplant.glb");
useGLTF.preload("/15-food/fish.glb");
useGLTF.preload("/15-food/fries.glb");
useGLTF.preload("/15-food/grapes.glb");
useGLTF.preload("/15-food/hotDog.glb");
useGLTF.preload("/15-food/iceCream.glb");
useGLTF.preload("/15-food/lemon.glb");
useGLTF.preload("/15-food/loaf.glb");
useGLTF.preload("/15-food/baguette.glb");
useGLTF.preload("/15-food/meat.glb");
useGLTF.preload("/15-food/ribs.glb");
useGLTF.preload("/15-food/pancakes.glb");
useGLTF.preload("/15-food/paprika.glb");
useGLTF.preload("/15-food/pear.glb");
useGLTF.preload("/15-food/pie.glb");
useGLTF.preload("/15-food/pineapple.glb");
useGLTF.preload("/15-food/pizza.glb");
useGLTF.preload("/15-food/dinnerPlate.glb");
useGLTF.preload("/15-food/pudding.glb");
useGLTF.preload("/15-food/pumpkin.glb");
useGLTF.preload("/15-food/sandwich.glb");
useGLTF.preload("/15-food/skewer.glb");
useGLTF.preload("/15-food/soda.glb");
useGLTF.preload("/15-food/strawberry.glb");
useGLTF.preload("/15-food/sub.glb");
useGLTF.preload("/15-food/sundae.glb");
useGLTF.preload("/15-food/sushi.glb");
useGLTF.preload("/15-food/taco.glb");
useGLTF.preload("/15-food/turkey.glb");
useGLTF.preload("/15-food/waffle.glb");
useGLTF.preload("/15-food/ham.glb");
