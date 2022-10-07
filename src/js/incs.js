import { fetchData } from "./fetchData.js";

const body = document.body;
const main = body.children.namedItem("main");
const recipeChoices = main.children.namedItem("recipe-choice-btn-group");
const recipeListing = main.children.namedItem("main-section-listing");

const getRecipe = async function(mealId) {
    return await fetchData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`); 
};

const getRecipes = async function() {
    return await fetchData("../food_db.json");
}

export { getRecipe, getRecipes, recipeListing, recipeChoices };
