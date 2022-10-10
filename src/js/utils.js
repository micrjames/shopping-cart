import { setRecipeServingCount } from "./recipeResult.js";

const setTooltipOpenState = function(tooltip, state) {
    if(state == "open") {
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = 1;
    } else {
        tooltip.style.visibility = "hidden";
        tooltip.style.opacity = 0;
    }
};
const getNumIngredients = function(recipe) {
    let ingredientsArr = [];
    for(let i = 1; i < 20; i++) {
        const ingredient = getIngredients(recipe, i);
        if(ingredient) ingredientsArr = [...ingredientsArr, ingredient];
    }
    return ingredientsArr.length;
};
const getIngredients = function(recipe, index) {
    return recipe[`strIngredient${index}`];
};
const setItemsCount = function(cartItemsCount, servingCount, itemsCount = servingCount) {
   setRecipeServingCount(servingCount);
   cartItemsCount.textContent = itemsCount;
};

export { setTooltipOpenState, getNumIngredients, getIngredients, setItemsCount };
