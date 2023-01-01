import { setRandomPrice } from "./setRandomPrice.js";
import { priceFormatter } from "./priceFormatter.js";

const getIngredient = function(recipe, index) {
    return recipe[`strIngredient${index}`];
};
const getIngredients = function(recipe) {
    let numIngredients = 0;
    let ingredientsArr = [];
    for(let i = 1; i < 20; i++) {
        const ingredient = getIngredient(recipe, i);
        if(ingredient) {
		   numIngredients++;
		   ingredientsArr = [...ingredientsArr, ingredient];
		}
    }
    return [ingredientsArr, numIngredients];
};

const setOrderTblVals = function(ingredients, recipeServingsCount, op) {
    let matchIndex = -1;

    let tblRowValsArr = [];
    ingredients.forEach(ingredient => {
	    const tblRowVals =  {};                                                                      
	    matchIndex = tblRowValsArr.findIndex(values => values.item == ingredient);
	    if(matchIndex != -1) {
		    if(op == "plus") tblRowValsArr[matchIndex].qty += recipeServingsCount;
		    else if(op == "minus") tblRowValsArr[matchIndex].qty -= recipeServingsCount;
		} else {
			tblRowVals.qty = recipeServingsCount;
		    tblRowVals.item = ingredient;
		    tblRowVals.price = priceFormatter.format(setRandomPrice());

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
	   arr = tblRowValsArr.map(tblRowVals => tblRowVals.qty * +tblRowVals.price);
	}
	const total = arr.reduce((sum, value) => sum + value);

	return total;
};

export { getIngredients, setOrderTblVals, calcTblTotals };
