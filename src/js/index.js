import { recipeListing, recipeChoices, getRecipes, orderSummaryBtnGroupClearBtn, orderSummaryBtnGroupCheckoutBtn, recipeResultControlsBtnGroupMinus, recipeResultControlsBtnGroupPlus, cartItems, cartItemsCount, tooltipText, orderSummaryTblBody, orderSummaryTblFoot, priceFormatter, orderSummary, defaultSummary, listViewToggleBtn, orderSummaryList, orderSummaryTbl } from "./incs.js";
import { createTblBody, removeTblBody, createTblFoot } from "./orderSummaryTbl.js";
import { createOrderList, removeOrderList } from "./orderSummaryList.js";
import { resetRecipeResult, setRecipeResult } from "./recipeResults.js";
import { setRecipeServingCount } from "./recipeResult.js";
import { createBtn, removeChildren } from "./DOMutils.js";
import { doCheckout, calcTblTotals, setTooltipOpenState, getIngredients, setItemsCount, setOrderTblVals, setOrderListVals } from "./utils.js";

let whichRecipe;
let recipeServingCount = 0;
let numIngredients = 0;
let cartItemsCountTotal = 0;
let totalQty = 0;
let totalPrice = 0;
let tblRowValsArr = [];
let orderListValsArr = [];
let ingredients;
let showDefault = true;
let showTblView = true;

setItemsCount(cartItemsCount, cartItemsCountTotal, recipeServingCount); 

cartItems.addEventListener("click", function() {
    if(tooltipText.style.visibility == "visible") {
	   setTooltipOpenState(tooltipText, "closed");
	   recipeResultControlsBtnGroupMinus.disabled = false;
	   recipeResultControlsBtnGroupPlus.disabled = false;
	   recipeServingCount = 0;
	   setRecipeServingCount(recipeServingCount);
	} else {
	   setTooltipOpenState(tooltipText, "open");
	   recipeResultControlsBtnGroupMinus.disabled = true;
	   recipeResultControlsBtnGroupPlus.disabled = true;
	   if(showDefault) {
		  defaultSummary.classList.remove("hidden");
		  orderSummary.classList.add("hidden");
	   } else {
		  defaultSummary.classList.add("hidden");
		  orderSummary.classList.remove("hidden");
		  if(showTblView) {
			 removeTblBody(orderSummaryTblBody);
			 createTblBody(orderSummaryTblBody, tblRowValsArr);
		  } else {
			 removeOrderList(orderSummaryList);
			 createOrderList(orderSummaryList, orderListValsArr);
			 const orderListDeleteControllers = document.querySelectorAll(".order-list-delete");
			 orderListDeleteControllers.forEach((orderListDeleteController, index) => {
				 orderListDeleteController.addEventListener("click", function() {
					 const orderListItemHdr = this.parentElement;
					 const orderListItem = orderListItemHdr.parentElement;

					 const orderList = orderListItem.parentElement;
					 removeChildren(orderList);
					 orderListValsArr.splice(index, 1);
				 });
			 });
		  }
	   }
	}
    totalQty = calcTblTotals(tblRowValsArr, "qty");
    totalPrice = calcTblTotals(tblRowValsArr, "price");
    createTblFoot(orderSummaryTblFoot, totalQty, priceFormatter.format(totalPrice));
});

listViewToggleBtn.addEventListener("click", function() {
    if(this.classList.contains("pressed")) this.classList.remove("pressed");
    else this.classList.add("pressed");

    showTblView = !showTblView;

    if(showTblView) {
	   orderSummaryTbl.classList.remove("hidden");
	   orderSummaryList.classList.add("hidden");
	} else {
	   orderSummaryTbl.classList.add("hidden");
	   orderSummaryList.classList.remove("hidden");
	}
});

orderSummaryBtnGroupClearBtn.addEventListener("click", function() {
    recipeServingCount = 0;
    setItemsCount(cartItemsCount, recipeServingCount);

    tblRowValsArr = [];
	if(showTblView) removeTblBody(orderSummaryTblBody);

    showDefault = true;
});
orderSummaryBtnGroupCheckoutBtn.addEventListener("click", doCheckout);

const recipesPromise = getRecipes();
recipesPromise.then(res => {
    const recipes = res.meals;
    const randomRecipeIndex = Math.floor(Math.random() * recipes.length);
	whichRecipe = recipes[randomRecipeIndex];
    ingredients = getIngredients(whichRecipe);
	numIngredients = ingredients.length;
    setRecipeResult(recipeListing, whichRecipe);
    recipes.forEach((recipe, index) => {
	  const choiceBtn = createBtn(`recipe-choice-btn-group-${index}`, "btn");
	  choiceBtn.textContent = `${index}`;
	  choiceBtn.addEventListener("click", () => {
		  whichRecipe = recipe;
		  ingredients = getIngredients(whichRecipe);
		  numIngredients = ingredients.length;
		  resetRecipeResult(recipeListing);
		  setRecipeResult(recipeListing, whichRecipe);
		  recipeServingCount = 0;
		  setRecipeServingCount(recipeServingCount);
	  });
	  recipeChoices.appendChild(choiceBtn);
	});
}).catch(err => console.log(err));

recipeResultControlsBtnGroupMinus.addEventListener("click", () => {
   if(recipeServingCount > 0) {
	  cartItemsCountTotal -= numIngredients;
	  setItemsCount(cartItemsCount, --recipeServingCount, cartItemsCountTotal);

	  tblRowValsArr = setOrderTblVals(tblRowValsArr, ingredients, recipeServingCount, "minus");
	  orderListValsArr = setOrderListVals(orderListValsArr, recipe, recipeServingCount, "minus");
   } else {
	  showDefault = true;
   }
});
recipeResultControlsBtnGroupPlus.addEventListener("click", () => {
   cartItemsCountTotal += numIngredients;
   setItemsCount(cartItemsCount, ++recipeServingCount, cartItemsCountTotal);

   tblRowValsArr = setOrderTblVals(tblRowValsArr, ingredients, recipeServingCount, "plus");
   orderListValsArr = setOrderListVals(orderListValsArr, whichRecipe, recipeServingCount, "plus");

   if(recipeServingCount > 0) {
	   showDefault = false;
   }
});
