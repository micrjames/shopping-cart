import { createSpan, createListItem } from "./DOMutils.js";

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
   const rRFtitle = recipeResultFigure.children.namedItem("recipe-result-figure-title");
   rRFtitle.textContent = data.strMeal;
   
   const rRFImageThumb = recipeResultFigure.children.namedItem("recipe-result-figure-thumb");
   rRFImageThumb.src = data.strMealThumb;                                         

   const recipeResultInstructions = recipeResult.children.namedItem("recipe-result-instructions");
   const recipeResultIngredients = recipeResult.children.namedItem("recipe-result-ingredients");
   const recipeResultIngredientsList = recipeResultIngredients.children.namedItem("recipe-result-ingredients-list");
   const recipeInstructionsTextList = recipeResultInstructions.children.namedItem("recipe-result-instructions-text-list");
    
   recipeResultIngredients.appendChild(createResultIngredientsList(recipeResultIngredientsList, data));
   createResultInstructionsList(recipeInstructionsTextList, data);
};

const resetRecipeResult = function(recipeResult) {
    const recipeResultFigure = recipeResult.children.namedItem("recipe-result-figure");
    const rRFtitle = recipeResultFigure.children.namedItem("recipe-result-figure-title");
	rRFtitle.textContent = null;

    const rRFImageThumb = recipeResultFigure.children.namedItem("recipe-result-figure-thumb");
    rRFImageThumb.src = null;                                         

    const recipeResultIngredients = recipeResult.children.namedItem("recipe-result-ingredients");
    const recipeResultIngredientsList = recipeResultIngredients.children.namedItem("recipe-result-ingredients-list");
    while(recipeResultIngredientsList.firstChild) {
	    recipeResultIngredientsList.removeChild(recipeResultIngredientsList.lastChild);
	}

    const recipeResultInstructions = recipeResult.children.namedItem("recipe-result-instructions");
    const recipeInstructionsTextList = recipeResultInstructions.children.namedItem("recipe-result-instructions-text-list");
    while(recipeInstructionsTextList.firstChild) {
	    recipeInstructionsTextList.removeChild(recipeInstructionsTextList.lastChild);
	}
};

export { setRecipeResult, resetRecipeResult };
