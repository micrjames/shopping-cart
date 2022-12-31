const body = document.body;

const header = body.children.namedItem("hdr-bar");
const cartItems = header.children.namedItem("cart-items");
const cartItemsCount = cartItems.children.namedItem("cart-items-count");
const tooltipContent = cartItems.children.namedItem("tooltip-content");

const defaultSummary = tooltipContent.children.namedItem("default-summary");
const orderSummary = tooltipContent.children.namedItem("order-summary");
const orderSummaryTbl = orderSummary.children.namedItem("order-summary-tbl");
const orderSummaryTblBdy = orderSummaryTbl.children.namedItem("order-summary-tbl-body");
const orderSummaryTblFoot = orderSummaryTbl.children.namedItem("order-summary-tbl-foot");
const orderSummaryTblFootRow = orderSummaryTblFoot.children.namedItem("order-summary-tbl-foot-row");
const orderSummaryTblFootRowQty = orderSummaryTblFootRow.children.namedItem("order-summary-tbl-foot-row-qty");
const orderSummaryTblFootRowTotal = orderSummaryTblFootRow.children.namedItem("order-summary-tbl-foot-row-total");
const osTblFoot = {
   qty: orderSummaryTblFootRowQty,
   total: orderSummaryTblFootRowTotal                                                                  
};

const orderSummaryBtnGroup = orderSummary.children.namedItem("order-summary-btn-group");
const orderSummaryClearBtn = orderSummaryBtnGroup.children.namedItem("order-summary-btn-group-clear-btn");
const orderSummaryCheckoutBtn = orderSummaryBtnGroup.children.namedItem("order-summary-btn-group-checkout-btn");

const main = body.children.namedItem("main");
const recipeChoicesBtnGroup = main.children.namedItem("recipe-choice-btn-group");

const mainListing = main.children.namedItem("main-section-listing");
const figure = mainListing.children.namedItem("recipe-result-figure");
const ingredients = mainListing.children.namedItem("recipe-result-ingredients");
const instructions = mainListing.children.namedItem("recipe-result-instructions");
const controls = mainListing.children.namedItem("recipe-result-controls");
const controlsBtnGroup = controls.children.namedItem("recipe-result-controls-btn-group");
const controlsMinusBtn = controlsBtnGroup.children.namedItem("recipe-result-controls-btn-group-minus");
const controlsPlusBtn = controlsBtnGroup.children.namedItem("recipe-result-controls-btn-group-plus");
const controlsCount = controlsBtnGroup.children.namedItem("recipe-result-controls-btn-group-count");

export { recipeChoicesBtnGroup, figure, ingredients, instructions, controlsMinusBtn, controlsPlusBtn, controlsCount, cartItems, cartItemsCount, tooltipContent, defaultSummary, orderSummary, orderSummaryTblBdy, osTblFoot, orderSummaryClearBtn, orderSummaryCheckoutBtn };
