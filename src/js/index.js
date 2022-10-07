import { recipeListing, recipeChoices, getRecipe, getRecipes } from "./incs.js";
import { resetRecipeResult, setRecipeResult } from "./recipeResults.js";
import { createBtn } from "./DOMutils.js";

const recipesPromise = getRecipes();
recipesPromise.then(res => {
    const recipes = res.meals;
    recipes.forEach((recipe, index) => {
	  const choiceBtn = createBtn(`recipe-choice-btn-group-${index}`, "btn");
	  choiceBtn.textContent = `${index}`;
	  recipeChoices.appendChild(choiceBtn);
	});
}).catch(err => console.log(err));

const mealId = 52785;
const recipePromise = getRecipe(mealId);
recipePromise.then(res => {
   	const recipe = res.meals[0];
    setRecipeResult(recipeListing, recipe);
}).catch(err => console.log(err));
