import { fetchData } from "./fetchData.js";

const body = document.body;
const main = body.children.namedItem("main");
const recipeChoices = main.children.namedItem("recipe-choice-btn-group");
const recipeListing = main.children.namedItem("main-section-listing");

const recipeResultControls = recipeListing.children.namedItem("recipe-result-controls");
const recipeResultControlsBtnGroup = recipeResultControls.children.namedItem("recipe-result-controls-btn-group");
const recipeResultControlsBtnGroupMinus = recipeResultControlsBtnGroup.children.namedItem("recipe-result-controls-btn-group-minus");
const recipeResultControlsBtnGroupCount = recipeResultControlsBtnGroup.children.namedItem("recipe-result-controls-btn-group-count");
const recipeResultControlsBtnGroupPlus = recipeResultControlsBtnGroup.children.namedItem("recipe-result-controls-btn-group-plus");

const getRecipe = async function(mealId) {
    return await fetchData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`); 
};

const getRecipes = async function() {
    return await fetchData("../food_db.json");
}

export { getRecipe, getRecipes, recipeListing, recipeChoices, recipeResultControlsBtnGroupMinus, recipeResultControlsBtnGroupPlus, recipeResultControlsBtnGroupCount };
