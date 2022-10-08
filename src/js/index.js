import { recipeListing, recipeChoices, getRecipes, recipeResultControlsBtnGroupMinus, recipeResultControlsBtnGroupPlus } from "./incs.js";
import { resetRecipeResult, setRecipeResult } from "./recipeResults.js";
import { setRecipeServingCount } from "./recipeResult.js";
import { createBtn } from "./DOMutils.js";

const recipesPromise = getRecipes();
recipesPromise.then(res => {
    const recipes = res.meals;
    const randomRecipeIndex = Math.floor(Math.random() * recipes.length);
    setRecipeResult(recipeListing, recipes[randomRecipeIndex]);
    recipes.forEach((recipe, index) => {
	  const choiceBtn = createBtn(`recipe-choice-btn-group-${index}`, "btn");
	  choiceBtn.textContent = `${index}`;
	  choiceBtn.addEventListener("click", () => {
		  resetRecipeResult(recipeListing);
		  setRecipeResult(recipeListing, recipe);
	  });
	  recipeChoices.appendChild(choiceBtn);
	});
}).catch(err => console.log(err));

let recipeServingCount = 0;
setRecipeServingCount(recipeServingCount);

recipeResultControlsBtnGroupMinus.addEventListener("click", () => {
   if(recipeServingCount > 0) setRecipeServingCount(--recipeServingCount);
});
recipeResultControlsBtnGroupPlus.addEventListener("click", () => {
   setRecipeServingCount(++recipeServingCount);
});
