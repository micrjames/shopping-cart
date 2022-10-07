import { recipeListing, getRecipe } from "./incs.js";
import { resetRecipeResult, setRecipeResult } from "./recipeResults.js";

const mealId = 52785;
const recipePromise = getRecipe(mealId);
recipePromise.then(res => {
   	const recipe = res.meals[0];
    setRecipeResult(recipeListing, recipe);
}).catch(err => console.log(err));
