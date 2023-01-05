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

const setOrderTblVals = function(tblRowValsArr, ingredients, recipeServingsCount, op) {
    let matchIndex = -1;

    let tempTblRowValsArr = tblRowValsArr;
    console.log(ingredients);
    ingredients.forEach(ingredient => {
	    const tblRowVals =  {};                                                                      
	    matchIndex = tempTblRowValsArr.findIndex(values => values.item == ingredient);
	    console.log(matchIndex);
	    if(matchIndex != -1) {
		    if(op == "plus") tempTblRowValsArr[matchIndex].qty += 1;
		    else if(op == "minus") tempTblRowValsArr[matchIndex].qty -= 1;
		} else {
			tblRowVals.qty = 1;
		    tblRowVals.item = ingredient;
		    tblRowVals.price = priceFormatter.format(setRandomPrice());

		    tempTblRowValsArr = [...tempTblRowValsArr, tblRowVals];
		}
	});

    return tempTblRowValsArr;
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
