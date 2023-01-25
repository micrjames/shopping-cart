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

const setIngredientsTblVals = function(tblRowValsArr, ingredients, op) {
    return ingredients.map(ingredient => {
	   const matchIndex = tblRowValsArr.findIndex(tblRowVals => tblRowVals.item == ingredient);
	   if(matchIndex == -1) {
		  return {
			 qty: 1,
			 item: ingredient,
			 price: priceFormatter.format(setRandomPrice())
		  };
	   } else {
		     let oppedValue;
			 if(op == "plus") oppedValue = tblRowValsArr[matchIndex].qty + 1; 
			 else if(op == "minus") oppedValue = tblRowValsArr[matchIndex].qty - 1;
			 return {
				qty: oppedValue,
				item: tblRowValsArr[matchIndex].item,
				price: tblRowValsArr[matchIndex].price
			 };
	   }
   });
};
const setOrderTblVals = function(tblRowValsArr, ingredients, op) {
   const tblRowItems = tblRowValsArr.map(tblRowVals => tblRowVals.item);

   const ingredientsObjArr =  setIngredientsTblVals(tblRowValsArr, ingredients, op);
   const ingredientsItems = ingredientsObjArr.map(ingredientObj => ingredientObj.item);

   const excludedTblRowItemsIdx = tblRowItems.map((item, itemIdx) => {
	  if(ingredientsItems.indexOf(item) == -1) {
		 return itemIdx;
	  }
   }).filter(valIndex => valIndex !== undefined);

   const excludedTblRowItems = excludedTblRowItemsIdx.map(excludedTblRowItemIdx => {
	   return tblRowValsArr[excludedTblRowItemIdx];
   }); 

   return [...excludedTblRowItems, ...ingredientsObjArr];
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

const setOrderListVals = function(recipeCaptionText, listItemValsArr, ingredients, op) {
	const matchIndex = listItemValsArr.findIndex(listItemVals => listItemVals.name == recipeCaptionText);
    console.log(matchIndex);
    if(matchIndex != -1) {
	   let oppedValue;
	   if(op == "plus") oppedValue = listItemValsArr[matchIndex].qty + ingredients.length; 
	   else if(op == "minus") oppedValue = listItemValsArr[matchIndex].qty - ingredients.length; 
	   return [{
			name: recipeCaptionText,
			ingredients: ingredients, 
			qty: oppedValue,
			totals: 1
	   }];
	} else {
	   return [...listItemValsArr, {
			name: recipeCaptionText,
			ingredients: ingredients, 
			qty: ingredients.length,
			totals: 1
	   }];
	}
};

export { getIngredients, setOrderTblVals, setOrderListVals, calcTblTotals };
