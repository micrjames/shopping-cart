import { recipeChoicesBtnGroup, figure, ingredients, instructions, controlsMinusBtn, controlsPlusBtn, controlsCount, cartItems, cartItemsCount, tooltipContent, defaultSummary, orderSummary } from "./incs.js";
import { createBtn } from "./DOMutils.js";
import { setRecipeResult, resetRecipeResult } from "./recipeResults.js";
import recipes from "../food_db.js";
import Random from "./Random.js";
import { getIngredient, getIngredients } from "./utils.js";

let recipeServingsCount = 0;
cartItemsCount.textContent = 0;
cartItemsCount.classList.add("hidden");
tooltipContent.classList.add("hidden");
orderSummary.classList.add("hidden");
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

controlsCount.textContent = recipeServingsCount;
controlsMinusBtn.addEventListener("click", function() {
   recipeServingsCount--;
   if(recipeServingsCount >= 0) {
	  controlsCount.textContent = recipeServingsCount;
	  cartItemsCount.textContent = recipeServingsCount;
	  
	  if(recipeServingsCount == 0) {
		 cartItemsCount.classList.add("hidden");
		 orderSummary.classList.add("hidden");
		 defaultSummary.classList.remove("hidden");
	  } else {
	  }
   } else {
	  recipeServingsCount = 0;
   }
});
controlsPlusBtn.addEventListener("click", function() {
   recipeServingsCount++;
   if(recipeServingsCount > 0) {
	  cartItemsCount.classList.remove("hidden");
	  orderSummary.classList.remove("hidden");
	  defaultSummary.classList.add("hidden");
   }
   controlsCount.textContent = recipeServingsCount;
   cartItemsCount.textContent = recipeServingsCount;
});
