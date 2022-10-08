import { createResultIngredientsList, createResultInstructionsList } from "./recipeResults.js";
import { removeChildren } from "./DOMutils.js";
import { recipeResultControlsBtnGroupCount } from "./incs.js";

const createTitle = function(figure, text) {
   const title = figure.children.namedItem("recipe-result-figure-title");
   title.textContent = text;
};

const createThumb = function(figure, imgSrc) {
   const imageThumb = figure.children.namedItem("recipe-result-figure-thumb");
   imageThumb.src = imgSrc;  
};

const createIngredients = function(ingredients, data) {
   const ingredientsList = ingredients.children.namedItem("recipe-result-ingredients-list");
   ingredients.appendChild(createResultIngredientsList(ingredientsList, data));
};

const createInstructions = function(instructions, data) {
   const instructionsTextList = instructions.children.namedItem("recipe-result-instructions-text-list");
   createResultInstructionsList(instructionsTextList, data);
};

const removeIngredients = function(ingredients) {
   const ingredientsList = ingredients.children.namedItem("recipe-result-ingredients-list");
   removeChildren(ingredientsList);
};

const removeInstructions = function(instructions) {
   const instructionsTextList = instructions.children.namedItem("recipe-result-instructions-text-list");
   removeChildren(instructionsTextList);
};

const setRecipeServingCount = function(count) {
   recipeResultControlsBtnGroupCount.textContent = count; 
};

export { createTitle, createThumb, createIngredients, createInstructions, removeIngredients, removeInstructions, setRecipeServingCount };
