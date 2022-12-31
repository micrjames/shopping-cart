import { recipeChoicesBtnGroup, figure, ingredients, instructions, controlsMinusBtn, controlsPlusBtn, controlsCount, cartItems, cartItemsCount, tooltipContent, defaultSummary, orderSummary, orderSummaryTblBdy, orderSummaryTblFootRowQty, orderSummaryTblFootRowTotal,orderSummaryClearBtn, orderSummaryCheckoutBtn } from "./incs.js";
import { createBtn } from "./DOMutils.js";
import { setRecipeResult, resetRecipeResult } from "./recipeResults.js";
import recipes from "../food_db.js";
import Random from "./Random.js";
import { priceFormatter } from "./priceFormatter.js";
import { range } from "./range.js";
import { setOrderTblVals, calcTblTotals } from "./utils.js";
import { createTblBody, removeTblBody } from "./orderSummaryTbl.js";

let ingredientsArr = [];
let tblRowValsArr = [];
let numIngredients = 0;

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

    removeTblBody(orderSummaryTblBdy); 
    createTblBody(orderSummaryTblBdy, tblRowValsArr);
});
orderSummaryClearBtn.addEventListener("click", function() {
    recipeServingsCountTotal = 0;
    cartItemsCount.textContent = recipeServingsCountTotal;
    tblRowValsArr = [];
	removeTblBody(orderSummaryTblBdy);
});
orderSummaryCheckoutBtn.addEventListener("click", function() {});
recipes.meals.forEach((recipe, recipeIndex) => {
   const choiceBtn = createBtn(`recipe-choice-btn-group-${recipeIndex}`, "btn");
   choiceBtn.textContent = `${recipeIndex}`;
   choiceBtn.addEventListener("click", function() {
	   numIngredients = 0;
	   [...range(20)].forEach((number) => {
		   const ingredient = recipe[`strIngredient${number+1}`];
		   if(ingredient) {
			  numIngredients++;
			  ingredientsArr = [...ingredientsArr, ingredient];
		   }
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
  const ingredient = recipe[`strIngredient${number+1}`];
  if(ingredient) {
	 numIngredients++;
	 ingredientsArr = [...ingredientsArr, ingredient];
  }
});

controlsMinusBtn.addEventListener("click", function() {
   recipeServingsCount--;
   recipeServingsCountTotal -= numIngredients;

   tblRowValsArr = setOrderTblVals(ingredientsArr, recipeServingsCount, "minus");
   if(recipeServingsCount >= 0) {
	  if(recipeServingsCount == 0) {
		 controlsMinusBtn.disabled = true;
	  } else {
	  }
   } else {
	  recipeServingsCount = 0;
   }
   orderSummaryTblFootRowQty.textContent = calcTblTotals(tblRowValsArr, "qty");
   orderSummaryTblFootRowTotal.textContent = priceFormatter.format(calcTblTotals(tblRowValsArr, "price"));
   controlsCount.textContent = recipeServingsCount;
   cartItemsCount.textContent = recipeServingsCountTotal;

   if(recipeServingsCountTotal) cartItemsCount.classList.remove("hidden");
   else {
      orderSummary.classList.add("hidden");
	  defaultSummary.classList.remove("hidden");
	  cartItemsCount.classList.add("hidden");
   }
});
controlsPlusBtn.addEventListener("click", function() {
   recipeServingsCount++;
   recipeServingsCountTotal += numIngredients;

   tblRowValsArr = setOrderTblVals(ingredientsArr, recipeServingsCount, "plus");
   if(recipeServingsCount > 0) {
	  cartItemsCount.classList.remove("hidden");
	  orderSummary.classList.remove("hidden");
	  defaultSummary.classList.add("hidden");

	  controlsMinusBtn.disabled = false;
   }
   orderSummaryTblFootRowQty.textContent = calcTblTotals(tblRowValsArr, "qty");
   orderSummaryTblFootRowTotal.textContent = priceFormatter.format(calcTblTotals(tblRowValsArr, "price"));
   controlsCount.textContent = recipeServingsCount;
   cartItemsCount.textContent = recipeServingsCountTotal;
});
