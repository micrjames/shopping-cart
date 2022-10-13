import { fetchData } from "./fetchData.js";

const body = document.body;
const hdr = body.children.namedItem("hdr-bar");
const cartItems = hdr.children.namedItem("cart-items");
const cartItemsCount = cartItems.children.namedItem("cart-items-count");
const tooltipText = cartItems.children.namedItem("tooltip-text");
const defaultSummary = tooltipText.children.namedItem("default-summary");
const orderSummary = tooltipText.children.namedItem("order-summary");
const listViewToggleBtn = orderSummary.children.namedItem("list-view-toggle-btn");
const orderSummaryList = orderSummary.children.namedItem("order-summary-list");
const orderSummaryTbl = orderSummary.children.namedItem("order-summary-tbl");
const orderSummaryTblBody = orderSummaryTbl.children.namedItem("order-summary-tbl-body");
const orderSummaryTblFoot = orderSummaryTbl.children.namedItem("order-summary-tbl-foot");

const orderSummaryBtnGroup = orderSummary.children.namedItem("order-summary-btn-group");
const orderSummaryBtnGroupClearBtn = orderSummaryBtnGroup.children.namedItem("order-summary-btn-group-clear-btn");
const orderSummaryBtnGroupCheckoutBtn = orderSummaryBtnGroup.children.namedItem("order-summary-btn-group-checkout-btn");

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

const priceFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

export { getRecipe, getRecipes, recipeListing, recipeChoices, orderSummaryBtnGroupClearBtn, orderSummaryBtnGroupCheckoutBtn, recipeResultControlsBtnGroupMinus, recipeResultControlsBtnGroupPlus, recipeResultControlsBtnGroupCount, cartItems, cartItemsCount, tooltipText, orderSummaryTblBody, orderSummaryTblFoot, priceFormatter, defaultSummary, orderSummary, listViewToggleBtn, orderSummaryList, orderSummaryTbl };
