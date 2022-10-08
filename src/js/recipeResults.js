import { createSpan, createListItem } from "./DOMutils.js";
import { createTitle, createThumb, createIngredients, createInstructions, removeIngredients, removeInstructions } from "./recipeResult.js";

const createResultIngredientsList = function(recipeResultIngredientsList, data) {                       
    for(let i = 1; i <= 20; i++) {                                          
        const ingredientsText = data[`strIngredient${i}`];
        const ingredientsMeasure = data[`strMeasure${i}`];                                                
        if(ingredientsText && ingredientsMeasure) {
            const text = createSpan(ingredientsText);                                                   
			const measure = createSpan(ingredientsMeasure);
                             
			const recipeResultIngredientsListItem = createListItem([text, measure]); 
                             
			recipeResultIngredientsList.appendChild(recipeResultIngredientsListItem);
       }                      
    }                         
    return recipeResultIngredientsList;
}; 

const createResultInstructionsList = function(recipeInstructionsTextList, data) {
    const instructionsText = data.strInstructions;                                                      
    for(const instructionText of instructionsText.split(".")) {
	   if(instructionText) {
		   const recipeInstructionsTextSpan = createSpan(instructionText.trim());
		   const recipeInstructionsTextListItem = createListItem([recipeInstructionsTextSpan]);

		   recipeInstructionsTextList.appendChild(recipeInstructionsTextListItem);
	   }
    }
};

const setRecipeResult = function(recipeResult, data) {
   const recipeResultFigure = recipeResult.children.namedItem("recipe-result-figure");
   createTitle(recipeResultFigure, data.strMeal);
   createThumb(recipeResultFigure, data.strMealThumb);

   const recipeResultIngredients = recipeResult.children.namedItem("recipe-result-ingredients");
   createIngredients(recipeResultIngredients, data);

   const recipeResultInstructions = recipeResult.children.namedItem("recipe-result-instructions");
   createInstructions(recipeResultInstructions, data);
};

const resetRecipeResult = function(recipeResult) {
    const recipeResultFigure = recipeResult.children.namedItem("recipe-result-figure");
    createTitle(recipeResultFigure, null);
    createThumb(recipeResultFigure, null);

    const recipeResultIngredients = recipeResult.children.namedItem("recipe-result-ingredients");
    removeIngredients(recipeResultIngredients);

    const recipeResultInstructions = recipeResult.children.namedItem("recipe-result-instructions");
    removeInstructions(recipeResultInstructions);
};

export { setRecipeResult, resetRecipeResult, createResultIngredientsList, createResultInstructionsList };
