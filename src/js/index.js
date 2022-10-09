import { recipeListing, recipeChoices, getRecipes, recipeResultControlsBtnGroupMinus, recipeResultControlsBtnGroupPlus, cartItems, cartItemsCount, tooltipText, orderSummaryTblBody, orderSummaryTblFoot, tblBodyVals } from "./incs.js";
import { createTblBody, createTblFoot } from "./orderSummary.js";
import { resetRecipeResult, setRecipeResult } from "./recipeResults.js";
import { setRecipeServingCount } from "./recipeResult.js";
import { createBtn } from "./DOMutils.js";

cartItems.addEventListener("click", function() {
    if(tooltipText.style.visibility == "visible") {
	   tooltipText.style.visibility = "hidden";
	   tooltipText.style.opacity = 0;
	} else {
	   tooltipText.style.visibility = "visible";
	   tooltipText.style.opacity = 1;
	}
});
cartItemsCount.textContent = "0";

tblBodyVals.qty = 1;
tblBodyVals.item = "Egg";
tblBodyVals.price = 1.25;
const orderSummaryTblBodyRow = createTblBody(tblBodyVals);
orderSummaryTblBody.appendChild(orderSummaryTblBodyRow);

createTblFoot(orderSummaryTblFoot, tblBodyVals.price);

const recipesPromise = getRecipes();
recipesPromise.then(res => {
    const recipes = res.meals;
    const randomRecipeIndex = Math.floor(Math.random() * recipes.length);
    setRecipeResult(recipeListing, recipes[randomRecipeIndex]);
    recipes.forEach((recipe, index) => {
	  const choiceBtn = createBtn(`recipe-choice-btn-group-${index}`, "btn");
	  choiceBtn.textContent = `${index}`;
	  choiceBtn.addEventListener("click", () => {
		  resetRecipeResult(recipeListing);
		  setRecipeResult(recipeListing, recipe);
	  });
	  recipeChoices.appendChild(choiceBtn);
	});
}).catch(err => console.log(err));

let recipeServingCount = 0;
setRecipeServingCount(recipeServingCount);

recipeResultControlsBtnGroupMinus.addEventListener("click", () => {
   if(recipeServingCount > 0) setRecipeServingCount(--recipeServingCount);
});
recipeResultControlsBtnGroupPlus.addEventListener("click", () => {
   setRecipeServingCount(++recipeServingCount);
});
