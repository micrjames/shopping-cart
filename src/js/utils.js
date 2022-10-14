import { setRecipeServingCount } from "./recipeResult.js";
import { setRandomPrice } from "./setRandomPrice.js";

const doCheckout = function() {
};

const setOrderListVals = function(orderListValsArr, recipe, recipeServingCount, op) {
   const listRowVals = {};

   listRowVals.name = recipe.strMeal;
   listRowVals.ingredients = getIngredients(recipe);
   listRowVals.qty = recipeServingCount;
   
   let totalsArr = [];
   listRowVals.ingredients.forEach(ingredient => {
	  totalsArr = [...totalsArr, +setRandomPrice()];
	  listRowVals.totals = totalsArr.reduce((sum, value) => sum + value);
   });
   listRowVals.totals = +listRowVals.totals;

   orderListValsArr = [...orderListValsArr, listRowVals];

   return orderListValsArr;
};

const setOrderTblVals = function(tblRowValsArr, ingredients, recipeServingCount, op) {
    let matchIndex = -1;

    ingredients.forEach(ingredient => {
		const tblRowVals =  {};                                                                      
	    matchIndex = tblRowValsArr.findIndex(values => values.item == ingredient);
	    if(matchIndex != -1) {
		    if(op == "plus") tblRowValsArr[matchIndex].qty += recipeServingCount;
		    else if(op == "minus") tblRowValsArr[matchIndex].qty -= recipeServingCount;
		} else {
			tblRowVals.qty = recipeServingCount;
		    tblRowVals.item = ingredient;
		    tblRowVals.price = setRandomPrice();

		    tblRowValsArr = [...tblRowValsArr, tblRowVals];
		}
	});

    return tblRowValsArr;
};

const calcTblTotals = function(tblRowValsArr, whichTotal) {
    let arr = [];
    if(whichTotal == "qty") { 
	   arr = tblRowValsArr.map(tblRowVals => tblRowVals.qty);
	} else if(whichTotal =="price") {
	   arr = tblRowValsArr.map(tblRowVals => +tblRowVals.price);
	}
	const total = arr.reduce((sum, value) => sum + value);

	return total;
};

const setTooltipOpenState = function(tooltip, state) {
    if(state == "open") {
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = 1;
    } else {
        tooltip.style.visibility = "hidden";
        tooltip.style.opacity = 0;
    }
};
const getIngredient = function(recipe, index) {
    return recipe[`strIngredient${index}`];
};
const getIngredients = function(recipe) {
    let ingredientsArr = [];
    for(let i = 1; i < 20; i++) {
        const ingredient = getIngredient(recipe, i);
        if(ingredient) ingredientsArr = [...ingredientsArr, ingredient];
    }
    return ingredientsArr;
};
const setItemsCount = function(cartItemsCount, servingCount, itemsCount = servingCount) {
   setRecipeServingCount(servingCount);
   cartItemsCount.textContent = itemsCount;
};

export { calcTblTotals, setOrderTblVals, setOrderListVals, setTooltipOpenState, getIngredient, getIngredients, setItemsCount, doCheckout };
