import { recipeChoicesBtnGroup, figure, ingredients, instructions, controlsMinusBtn, controlsPlusBtn, controlsCount, cartItems, cartItemsCount, tooltipContent, defaultSummary, orderSummary, orderSummaryTblFootRowQty, orderSummaryTblFootRowTotal } from "./incs.js";
import { createBtn } from "./DOMutils.js";
import { setRecipeResult, resetRecipeResult } from "./recipeResults.js";
import recipes from "../food_db.js";
import Random from "./Random.js";
import { priceFormatter } from "./priceFormatter.js";
import { range } from "./range.js";

let numIngredients = 0;
orderSummaryTblFootRowTotal.textContent = priceFormatter.format(0.00);

let recipeServingsCountTotal = 0;
let recipeServingsCount = 0;
controlsMinusBtn.disabled = true;

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

	   recipeServingsCount = 0;
	   controlsCount.textContent = 0;
	   resetRecipeResult({figure, ingredients, instructions});
	   setRecipeResult({figure, ingredients, instructions}, recipe);
	   controlsMinusBtn.disabled = true;
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
   recipeServingsCount--;
   recipeServingsCountTotal -= numIngredients;
   if(recipeServingsCount >= 0) {
	  if(recipeServingsCount == 0) {
		 orderSummary.classList.add("hidden");
		 defaultSummary.classList.remove("hidden");
		 controlsMinusBtn.disabled = true;
	  } else {
		 orderSummaryTblFootRowQty.textContent = recipeServingsCountTotal;
	  }
   } else {
	  recipeServingsCount = 0;
   }
   controlsCount.textContent = recipeServingsCount;
   cartItemsCount.textContent = recipeServingsCountTotal;

   if(recipeServingsCountTotal) cartItemsCount.classList.remove("hidden");
   else cartItemsCount.classList.add("hidden");
});
controlsPlusBtn.addEventListener("click", function() {
   recipeServingsCount++;
   recipeServingsCountTotal += numIngredients;
   if(recipeServingsCount > 0) {
	  cartItemsCount.classList.remove("hidden");
	  orderSummary.classList.remove("hidden");
	  defaultSummary.classList.add("hidden");

	  orderSummaryTblFootRowQty.textContent = recipeServingsCountTotal;

	  controlsMinusBtn.disabled = false;
   }
   controlsCount.textContent = recipeServingsCount;
   cartItemsCount.textContent = recipeServingsCountTotal;
});
