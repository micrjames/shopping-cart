import { recipeListing, recipeChoices, getRecipes, recipeResultControlsBtnGroupMinus, recipeResultControlsBtnGroupPlus, cartItems, cartItemsCount, tooltipText, orderSummaryTblBody, orderSummaryTblFoot, tblRowVals } from "./incs.js";
import { createTblBody, removeTblBody, createTblFoot } from "./orderSummary.js";
import { resetRecipeResult, setRecipeResult } from "./recipeResults.js";
import { setRecipeServingCount } from "./recipeResult.js";
import { createBtn } from "./DOMutils.js";

let whichRecipe;
let tblBodyVals = [];

cartItems.addEventListener("click", function() {
    if(tooltipText.style.visibility == "visible") {
	   tooltipText.style.visibility = "hidden";
	   tooltipText.style.opacity = 0;

	   removeTblBody(orderSummaryTblBody);
	} else {
	   tooltipText.style.visibility = "visible";
	   tooltipText.style.opacity = 1;
	   tblRowVals.qty = 1;
	   tblRowVals.item = "Egg";
	   tblRowVals.price = 1.25;
	   tblBodyVals = [...tblBodyVals, tblRowVals];

	   createTblBody(orderSummaryTblBody, tblBodyVals);
	}
    createTblFoot(orderSummaryTblFoot, 1.25);
});
cartItemsCount.textContent = "0";


const recipesPromise = getRecipes();
recipesPromise.then(res => {
    const recipes = res.meals;
    const randomRecipeIndex = Math.floor(Math.random() * recipes.length);
	whichRecipe = recipes[randomRecipeIndex];
    setRecipeResult(recipeListing, whichRecipe);
    recipes.forEach((recipe, index) => {
	  const choiceBtn = createBtn(`recipe-choice-btn-group-${index}`, "btn");
	  choiceBtn.textContent = `${index}`;
	  choiceBtn.addEventListener("click", () => {
		  whichRecipe = recipe;
		  resetRecipeResult(recipeListing);
		  setRecipeResult(recipeListing, whichRecipe);
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
