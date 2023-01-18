import { recipeChoicesBtnGroup, figure, ingredients, instructions, controlsMinusBtn, controlsPlusBtn, controlsCount, cartItems, cartItemsCount, tooltipContent, defaultSummary, orderSummary, orderSummaryTbl, orderSummaryTblBdy, osTblFoot, orderSummaryClearBtn, orderSummaryCheckoutBtn, orderSummaryList, orderSummaryListViewToggleBtn } from "./incs.js";
import { createBtn } from "./utils/DOMutils.js";
import { setRecipeResult, resetRecipeResult } from "./recipeResults.js";
import recipes from "../food_db.js";
import Random from "./utils/Random.js";
import { priceFormatter } from "./utils/priceFormatter.js";
import { getIngredients, setOrderTblVals, setOrderListVals, calcTblTotals } from "./utils/utils.js";
import { createTblBody, removeTblBody, createTblFoot } from "./orderSummaryTbl.js";
import { createOrderList, removeOrderList } from "./orderSummaryList.js";

let ingredientsArr = [];
let numIngredients = 0;

let recipeServingsCountTotal = 0;
cartItemsCount.textContent = recipeServingsCountTotal;
let tblRowValsArr = [];
let listItemValsArr = [];

let recipeServingsCount = 0;
controlsMinusBtn.disabled = true;

cartItemsCount.classList.add("hidden");
tooltipContent.classList.add("hidden");
orderSummary.classList.add("hidden");
orderSummaryList.classList.add("hidden");
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

    if(!orderSummaryTbl.classList.contains("hidden")) {
	   removeTblBody(orderSummaryTblBdy); 
	   createTblBody(orderSummaryTblBdy, tblRowValsArr);
	   createTblFoot(osTblFoot, calcTblTotals(tblRowValsArr, "qty"), priceFormatter.format(calcTblTotals(tblRowValsArr, "price"))); 
	} else if(!orderSummaryList.classList.contains("hidden")) {
	   removeOrderList(orderSummaryList);
	   createOrderList(orderSummaryList, listItemValsArr);
	   const orderSummaryListItems = orderSummaryList.children;
	   for(const orderSummaryListItem of orderSummaryListItems) {
		   const orderSummaryListItemHdr = orderSummaryListItem.children[0];
		   const orderSummaryListItemHdrCloseBtn = orderSummaryListItemHdr.children[1];
		   orderSummaryListItemHdrCloseBtn.addEventListener("click", function() {
			   alert("clicked");
		   });
	   }
	}
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
orderSummaryListViewToggleBtn.addEventListener("click", function() {
    orderSummaryTbl.classList.toggle("hidden");
    orderSummaryList.classList.toggle("hidden");
});
recipes.meals.forEach((recipe, recipeIndex) => {
   const choiceBtn = createBtn(`recipe-choice-btn-group-${recipeIndex}`, "btn");
   choiceBtn.textContent = `${recipeIndex}`;
   choiceBtn.addEventListener("click", function() {
	   ingredientsArr = [];
	   numIngredients = 0;
	   let tempIngredientsArr;
	   [tempIngredientsArr, numIngredients] = getIngredients(recipe);
	   ingredientsArr = [...ingredientsArr, ...tempIngredientsArr];
	   
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

   tblRowValsArr = setOrderTblVals(tblRowValsArr, ingredientsArr, "minus");
   listItemValsArr = setOrderListVals(figure.children[1].textContent, listItemValsArr, ingredientsArr, "minus");
   
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

   tblRowValsArr = setOrderTblVals(tblRowValsArr, ingredientsArr, "plus");
   listItemValsArr = setOrderListVals(figure.children[1].textContent, listItemValsArr, ingredientsArr, "plus");
   if(recipeServingsCount > 0) {
	  cartItemsCount.classList.remove("hidden");
	  orderSummary.classList.remove("hidden");
	  defaultSummary.classList.add("hidden");

	  controlsMinusBtn.disabled = false;
   }
   controlsCount.textContent = recipeServingsCount;
   cartItemsCount.textContent = recipeServingsCountTotal;
});
