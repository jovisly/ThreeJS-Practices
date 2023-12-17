import { create } from "zustand";

const useFoodStore = create((set) => ({
  foods: [],
  addFood: (food) =>
    set((state) => ({
      foods: [
        ...state.foods,
        {
          type: food,
          x: Math.random() * 10 - 5,
          z: Math.random() * 10 - 5,
          rotationX: (Math.random() - 0.5) * 2 * 0.24,
          rotationY: (Math.random() - 0.5) * 2 * Math.PI,
          rotationZ: (Math.random() - 0.5) * 2 * 0.24,

          id: state.foods.length,
        },
      ],
    })),
}));

export default useFoodStore;
