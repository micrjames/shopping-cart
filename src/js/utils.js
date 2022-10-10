const setTooltipOpenState = function(tooltip, state) {
    if(state == "open") {
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = 1;
    } else {
        tooltip.style.visibility = "hidden";
        tooltip.style.opacity = 0;
    }
};
const getNumIngredients = function(recipe) {
    let ingredientsArr = [];
    for(let i = 1; i < 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        if(ingredient) ingredientsArr = [...ingredientsArr, ingredient];
    }
    return ingredientsArr.length;
};

export { setTooltipOpenState, getNumIngredients };
