import { removeChildren, createSpan, createListItem } from "./utils/DOMutils.js";

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

const removeIngredients = function(ingredients) {
   const ingredientsList = ingredients.children.namedItem("recipe-result-ingredients-list");
   removeChildren(ingredientsList);
};

const removeInstructions = function(instructions) {
   const instructionsTextList = instructions.children.namedItem("recipe-result-instructions-text-list");
   removeChildren(instructionsTextList);
};

export { createTitle, createThumb, createIngredients, createInstructions, removeIngredients, removeInstructions };
