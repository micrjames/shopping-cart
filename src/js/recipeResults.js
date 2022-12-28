import { createTitle, createThumb, createIngredients, createInstructions } from "./recipeResult.js";

const setRecipeResult = function(recipeResults, recipe) {
    createTitle(recipeResults.figure, recipe.strMeal);
    createThumb(recipeResults.figure, recipe.strMealThumb);
    createIngredients(recipeResults.ingredients, recipe);
    createInstructions(recipeResults.instructions, recipe);                                             
}; 

export { setRecipeResult };
