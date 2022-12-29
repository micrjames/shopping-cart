import { recipeChoicesBtnGroup, figure, ingredients, instructions, controlsMinusBtn, controlsPlusBtn, controlsCount, cartItems, cartItemsCount, tooltipContent, defaultSummary, orderSummary, orderSummaryTblFootRowQty, orderSummaryTblFootRowTotal } from "./incs.js";
import { createBtn } from "./DOMutils.js";
import { setRecipeResult, resetRecipeResult } from "./recipeResults.js";
import recipes from "../food_db.js";
import Random from "./Random.js";
import { priceFormatter } from "./priceFormatter.js";
import { range } from "./range.js";

let numIngredients = 0;
orderSummaryTblFootRowTotal.textContent = priceFormatter.format(0.00);
let recipeServingsCount = 0;
cartItemsCount.textContent = 0;
cartItemsCount.classList.add("hidden");
tooltipContent.classList.add("hidden");
orderSummary.classList.add("hidden");
controlsCount.textContent = recipeServingsCount;
cartItems.addEventListener("click", function() {
    tooltipContent.classList.toggle("hidden");
});
recipes.meals.forEach((recipe, recipeIndex) => {
   const choiceBtn = createBtn(`recipe-choice-btn-group-${recipeIndex}`, "btn");
   choiceBtn.textContent = `${recipeIndex}`;
   choiceBtn.addEventListener("click", function() {
	   numIngredients = 0;
	   [...range(20)].forEach((number) => {
		   const ingredients = recipe[`strIngredient${number+1}`];
		   if(ingredients) numIngredients++;
	   });

	   controlsCount.textContent = 0;
	   resetRecipeResult({figure, ingredients, instructions});
	   setRecipeResult({figure, ingredients, instructions}, recipe);
   });

   recipeChoicesBtnGroup.appendChild(choiceBtn);
});

const randomRecipeIndex = new Random(0, recipes.meals.length-1);
const recipe = recipes.meals[randomRecipeIndex.integer];
setRecipeResult({figure, ingredients, instructions}, recipe);
[...range(20)].forEach((number) => {
  const ingredients = recipe[`strIngredient${number+1}`];
  if(ingredients) numIngredients++;
});

controlsMinusBtn.addEventListener("click", function() {
   recipeServingsCount-=numIngredients;
   if(recipeServingsCount >= 0) {
	  controlsCount.textContent = recipeServingsCount;
	  cartItemsCount.textContent = recipeServingsCount;
	  
	  if(recipeServingsCount == 0) {
		 cartItemsCount.classList.add("hidden");
		 orderSummary.classList.add("hidden");
		 defaultSummary.classList.remove("hidden");
	  } else {
		 orderSummaryTblFootRowQty.textContent = recipeServingsCount;
	  }
   } else {
	  recipeServingsCount = 0;
   }
});
controlsPlusBtn.addEventListener("click", function() {
   recipeServingsCount+=numIngredients;
   if(recipeServingsCount > 0) {
	  cartItemsCount.classList.remove("hidden");
	  orderSummary.classList.remove("hidden");
	  defaultSummary.classList.add("hidden");

	  orderSummaryTblFootRowQty.textContent = recipeServingsCount;
   }
   controlsCount.textContent = recipeServingsCount;
   cartItemsCount.textContent = recipeServingsCount;
});
