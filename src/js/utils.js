import { setRecipeServingCount } from "./recipeResult.js";
import { setRandomPrice } from "./setRandomPrice.js";

const doCheckout = function() {
};

const setOrderVals = function(tblRowValsArr, ingredients, recipeServingCount, op) {
    let matchIndex = -1;
    console.log(tblRowValsArr);

    ingredients.forEach(ingredient => {
		const tblRowVals =  {};                                                                      
	    matchIndex = tblRowValsArr.findIndex(values => values.item == ingredient);
	    if(matchIndex != -1) {
		    if(op == "plus") tblRowValsArr[matchIndex].qty += recipeServingCount;
		    else if(op == "minus") tblRowValsArr[matchIndex].qty -= recipeServingCount;
		} else {
		    if(op == "plus") 
			    tblRowVals.qty = recipeServingCount;
		    else if(op == "minus") 
			    tblRowVals.qty = recipeServingCount;
		    tblRowVals.item = ingredient;
		    tblRowVals.price = setRandomPrice();

		    tblRowValsArr = [...tblRowValsArr, tblRowVals];
		}
	});

    return tblRowValsArr;
};

const calcTotals = function(tblRowValsArr, whichTotal) {
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

export { calcTotals, setOrderVals, setTooltipOpenState, getIngredient, getIngredients, setItemsCount, doCheckout };
