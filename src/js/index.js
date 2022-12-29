import { recipeChoicesBtnGroup, figure, ingredients, instructions, controlsMinusBtn, controlsPlusBtn, controlsCount, cartItems, cartItemsCount, tooltipContent } from "./incs.js";
import { createBtn } from "./DOMutils.js";
import { setRecipeResult, resetRecipeResult } from "./recipeResults.js";
import recipes from "../food_db.js";
import Random from "./Random.js";
import { getIngredient, getIngredients } from "./utils.js";

tooltipContent.classList.add("hidden");
cartItems.addEventListener("click", function() {
    tooltipContent.classList.toggle("hidden");
});
recipes.meals.forEach((recipe, recipeIndex) => {
   const choiceBtn = createBtn(`recipe-choice-btn-group-${recipeIndex}`, "btn");
   choiceBtn.textContent = `${recipeIndex}`;
   choiceBtn.addEventListener("click", function() {
	   resetRecipeResult({figure, ingredients, instructions});
	   setRecipeResult({figure, ingredients, instructions}, recipe);
   });

   recipeChoicesBtnGroup.appendChild(choiceBtn);
});

const randomRecipeIndex = new Random(0, recipes.meals.length-1);
setRecipeResult({figure, ingredients, instructions}, recipes.meals[randomRecipeIndex.integer]);

controlsMinusBtn.addEventListener("click", function() {
});
controlsPlusBtn.addEventListener("click", function() {
});

controlsCount.textContent = 0;
