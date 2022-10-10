import { recipeListing, recipeChoices, getRecipes, recipeResultControlsBtnGroupMinus, recipeResultControlsBtnGroupPlus, cartItems, cartItemsCount, tooltipText, orderSummaryTblBody, orderSummaryTblFoot, tblRowVals } from "./incs.js";
import { createTblBodyRow, removeTblBody, createTblFoot } from "./orderSummary.js";
import { resetRecipeResult, setRecipeResult } from "./recipeResults.js";
import { setRecipeServingCount } from "./recipeResult.js";
import { createBtn } from "./DOMutils.js";
import { setTooltipOpenState, getNumIngredients } from "./utils.js";

let whichRecipe;
let recipeServingCount = 0;
let ingredientsLength = 0;
let cartItemsCountTotal = 0;

cartItems.addEventListener("click", function() {
    if(tooltipText.style.visibility == "visible") {
	   setTooltipOpenState(tooltipText, "closed");
	   removeTblBody(orderSummaryTblBody);
	} else {
	   setTooltipOpenState(tooltipText, "open");
	   for(let i = 1; i < 20; i++) {
		  const ingredient = whichRecipe[`strIngredient${i}`];
		  if(ingredient && recipeServingCount) {
			 tblRowVals.qty = 1;
			 tblRowVals.item = ingredient;
			 tblRowVals.price = 1.25;
			 const tblBodyRow = createTblBodyRow(tblRowVals);
			 orderSummaryTblBody.appendChild(tblBodyRow);

		  }
	   }
	}
    const totalQty = 1;
    const totalPrice = 1.25;
    createTblFoot(orderSummaryTblFoot, totalQty, totalPrice);
});
cartItemsCount.textContent = recipeServingCount;

const recipesPromise = getRecipes();
recipesPromise.then(res => {
    const recipes = res.meals;
    const randomRecipeIndex = Math.floor(Math.random() * recipes.length);
	whichRecipe = recipes[randomRecipeIndex];
	ingredientsLength = getNumIngredients(whichRecipe);
    setRecipeResult(recipeListing, whichRecipe);
    recipes.forEach((recipe, index) => {
	  const choiceBtn = createBtn(`recipe-choice-btn-group-${index}`, "btn");
	  choiceBtn.textContent = `${index}`;
	  choiceBtn.addEventListener("click", () => {
		  whichRecipe = recipe;
		  ingredientsLength = getNumIngredients(whichRecipe);
		  resetRecipeResult(recipeListing);
		  setRecipeResult(recipeListing, whichRecipe);
		  recipeServingCount = 0;
		  setRecipeServingCount(recipeServingCount);
	  });
	  recipeChoices.appendChild(choiceBtn);
	});
}).catch(err => console.log(err));

setRecipeServingCount(recipeServingCount);

recipeResultControlsBtnGroupMinus.addEventListener("click", () => {
   if(recipeServingCount > 0) setRecipeServingCount(--recipeServingCount);
   cartItemsCountTotal = recipeServingCount * ingredientsLength;
   cartItemsCount.textContent = cartItemsCountTotal;
});
recipeResultControlsBtnGroupPlus.addEventListener("click", () => {
   setRecipeServingCount(++recipeServingCount);
   cartItemsCountTotal = recipeServingCount * ingredientsLength;
   cartItemsCount.textContent = cartItemsCountTotal;
});
