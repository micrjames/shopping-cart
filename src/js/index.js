import { recipeChoicesBtnGroup, figure, ingredients, instructions, controlsMinusBtn, controlsPlusBtn, controlsCount, cartItems, cartItemsCount, tooltipContent, defaultSummary, orderSummary, orderSummaryTblBdy, osTblFoot, orderSummaryClearBtn, orderSummaryCheckoutBtn } from "./incs.js";
import { createBtn } from "./DOMutils.js";
import { setRecipeResult, resetRecipeResult } from "./recipeResults.js";
import recipes from "../food_db.js";
import Random from "./Random.js";
import { priceFormatter } from "./priceFormatter.js";
import { getIngredients, setOrderTblVals, calcTblTotals } from "./utils.js";
import { createTblBody, removeTblBody, createTblFoot } from "./orderSummaryTbl.js";

let ingredientsArr = [];
let numIngredients = 0;

let recipeServingsCountTotal = 0;
cartItemsCount.textContent = recipeServingsCountTotal;
let tblRowValsArr = [];

let recipeServingsCount = 0;
controlsMinusBtn.disabled = true;

cartItemsCount.classList.add("hidden");
tooltipContent.classList.add("hidden");
orderSummary.classList.add("hidden");
controlsCount.textContent = recipeServingsCount;
cartItems.addEventListener("click", function() {
    if(tooltipContent.classList.contains("hidden")) {
	   controlsMinusBtn.disabled = true;
	   controlsPlusBtn.disabled = true;
	} else {
	   if(recipeServingsCount == 0) controlsMinusBtn.disabled = true;
	   else controlsMinusBtn.disabled = false;
	   controlsPlusBtn.disabled = false;
	}
    tooltipContent.classList.toggle("hidden");

    removeTblBody(orderSummaryTblBdy); 
    createTblBody(orderSummaryTblBdy, tblRowValsArr);
    createTblFoot(osTblFoot, calcTblTotals(tblRowValsArr, "qty"), priceFormatter.format(calcTblTotals(tblRowValsArr, "price"))); 
});
orderSummaryClearBtn.addEventListener("click", function() {
    recipeServingsCountTotal = 0;
    cartItemsCount.textContent = recipeServingsCountTotal;

    recipeServingsCount = 0;
	controlsCount.textContent = recipeServingsCount;
    tblRowValsArr = [];
    ingredientsArr = [];

	removeTblBody(orderSummaryTblBdy);
    cartItemsCount.classList.add("hidden");
    createTblFoot(osTblFoot, 0, priceFormatter.format(0.00)); 

    orderSummary.classList.add("hidden");
	defaultSummary.classList.remove("hidden");
});
orderSummaryCheckoutBtn.addEventListener("click", function() {});
recipes.meals.forEach((recipe, recipeIndex) => {
   const choiceBtn = createBtn(`recipe-choice-btn-group-${recipeIndex}`, "btn");
   choiceBtn.textContent = `${recipeIndex}`;
   choiceBtn.addEventListener("click", function() {
	   ingredientsArr = [];
	   numIngredients = 0;
	   let tempIngredientsArr;
	   [tempIngredientsArr, numIngredients] = getIngredients(recipe);
	   ingredientsArr = [...ingredientsArr, ...tempIngredientsArr];
	   console.log(ingredientsArr);
	   
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
[ingredientsArr, numIngredients] = getIngredients(recipe);

controlsMinusBtn.addEventListener("click", function() {
   recipeServingsCount--;
   recipeServingsCountTotal -= numIngredients;

   console.log(ingredientsArr);
   tblRowValsArr = setOrderTblVals(tblRowValsArr, ingredientsArr, recipeServingsCount, "minus");
   console.log(tblRowValsArr);
   if(recipeServingsCount == 0) {
	  controlsMinusBtn.disabled = true;
   } else if(recipeServingsCount < 0) {
	  recipeServingsCount = 0;
   }
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

   console.log(ingredientsArr);
   tblRowValsArr = setOrderTblVals(tblRowValsArr, ingredientsArr, recipeServingsCount, "plus");
   console.log(tblRowValsArr);
   if(recipeServingsCount > 0) {
	  cartItemsCount.classList.remove("hidden");
	  orderSummary.classList.remove("hidden");
	  defaultSummary.classList.add("hidden");

	  controlsMinusBtn.disabled = false;
   }
   controlsCount.textContent = recipeServingsCount;
   cartItemsCount.textContent = recipeServingsCountTotal;
});
