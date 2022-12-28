const getIngredient = function(recipe, index) {
    return recipe[`strIngredient${index}`];
};
const getIngredients = function(recipe) {
    let ingredientsArr = [];
    for(let i = 1; i < 20; i++) {
        const ingredient = getIngredient(recipe, i);
        if(ingredient) ingredientsArr = [...ingredientsArr, ingredient];
    }
    return ingredientsArr;
};

export { getIngredient, getIngredients };
