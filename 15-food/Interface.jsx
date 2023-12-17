import { useState } from "react";
import Button from "@mui/material/Button";

import useFoodStore from "./stores/useFoodStore.jsx";

export default function Interface() {
  const [selectedOption, setSelectedOption] = useState("apple");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const addFood = useFoodStore((state) => state.addFood);

  return (
    <div className="interface">
      <label htmlFor="dropdown">Pick your food</label>
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="apple">Apple</option>
        <option value="avocado">Avocado</option>
        <option value="baguette">Baguette</option>
        <option value="banana">Banana</option>
        <option value="beet">Beet</option>
        <option value="bread">Bread</option>
        <option value="burger">Burger</option>
        <option value="cabbage">Cabbage</option>
        <option value="cake">Cake</option>
        <option value="carrot">Carrot</option>
        <option value="cauliflower">Cauliflower</option>
        <option value="cherries">Cherries</option>
        <option value="chinese">Chinese</option>
        <option value="chocolate">Chocolate</option>
        <option value="cocktail">Cocktail</option>
        <option value="coconut">Coconut</option>
        <option value="corn">Corn</option>
        <option value="cornDog">Corn Dog</option>
        <option value="croissant">Croissant</option>
        <option value="cupcake">Cupcake</option>
        <option value="dinnerPlate">Dinner Plate</option>
        <option value="donut">Donut</option>
        <option value="eggplant">Eggplant</option>
        <option value="fish">Fish</option>
        <option value="fries">Fries</option>
        <option value="grapes">Grapes</option>
        <option value="ham">Ham</option>
        <option value="hotDog">Hot Dog</option>
        <option value="iceCream">Ice Cream</option>
        <option value="lemon">Lemon</option>
        <option value="loaf">Loaf</option>
        <option value="meat">Meat</option>
        <option value="pancakes">Pancakes</option>
        <option value="paprika">Paprika</option>
        <option value="pear">Pear</option>
        <option value="pie">Pie</option>
        <option value="pineapple">Pineapple</option>
        <option value="pizza">Pizza</option>
        <option value="pudding">Pudding</option>
        <option value="pumpkin">Pumpkin</option>
        <option value="ribs">Ribs</option>
        <option value="sandwich">Sandwich</option>
        <option value="skewer">Skewer</option>
        <option value="soda">Soda</option>
        <option value="bowl">Soup</option>
        <option value="strawberry">Strawberry</option>
        <option value="sub">Sub</option>
        <option value="sundae">Sundae</option>
        <option value="sushi">Sushi</option>
        <option value="taco">Taco</option>
        <option value="turkey">Turkey</option>
        <option value="waffle">Waffle</option>
      </select>

      <Button
        variant="contained"
        onClick={() => {
          addFood(selectedOption);
        }}
      >
        Gimme!
      </Button>
    </div>
  );
}
