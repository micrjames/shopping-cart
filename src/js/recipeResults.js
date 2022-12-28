import { createTitle, createThumb, createIngredients, createInstructions, removeIngredients, removeInstructions } from "./recipeResult.js";

const setRecipeResult = function(recipeResults, recipe) {
    createTitle(recipeResults.figure, recipe.strMeal);
    createThumb(recipeResults.figure, recipe.strMealThumb);
    createIngredients(recipeResults.ingredients, recipe);
    createInstructions(recipeResults.instructions, recipe);                                             
}; 

const resetRecipeResult = function(recipeResults) {
    createTitle(recipeResults.figure, null);
    createThumb(recipeResults.figure, null);

    removeIngredients(recipeResults.ingredients);
    removeInstructions(recipeResults.instructions);
};

export { setRecipeResult, resetRecipeResult };
