const body = document.body;
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

const recipe = {"idMeal":"52785","strMeal":"Dalfry","strDrinkAlternate":null,"strCategory":"Vegetarian","strArea":"Indian","strInstructions":"Wash and soak toor dal in approx. 3 cups of water, for at least one hours. Dal will be double in volume after soaking. Drain the water.\r\nCook dal with 2-1\/2 cups water and add salt, turmeric, on medium high heat, until soft in texture (approximately 30 mins) it should be like thick soup.\r\nIn a frying pan, heat the ghee. Add cumin seeds, and mustard seeds. After the seeds crack, add bay leaves, green chili, ginger and chili powder. Stir for a few seconds.\r\nAdd tomatoes, salt and sugar stir and cook until tomatoes are tender and mushy.\r\nAdd cilantro and garam masala cook for about one minute.\r\nPour the seasoning over dal mix it well and cook for another minute.\r\nServe with Naan.","strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/wuxrtu1483564410.jpg","strTags":"Curry,Vegetarian,Cake","strYoutube":"https:\/\/www.youtube.com\/watch?v=J4D855Q9-jg","strIngredient1":"Toor dal","strIngredient2":"Water","strIngredient3":"Salt","strIngredient4":"Turmeric","strIngredient5":"Ghee","strIngredient6":"Chopped tomatoes","strIngredient7":"Cumin seeds","strIngredient8":"Mustard Seeds","strIngredient9":"Bay Leaf","strIngredient10":"Green Chili","strIngredient11":"Ginger","strIngredient12":"Cilantro","strIngredient13":"Red Pepper","strIngredient14":"Salt","strIngredient15":"Sugar","strIngredient16":"Garam Masala","strIngredient17":"","strIngredient18":"","strIngredient19":"","strIngredient20":"","strMeasure1":"1 cup","strMeasure2":"2-1\/2 cups","strMeasure3":"1 tsp","strMeasure4":"1\/4 tsp","strMeasure5":"3 tbs","strMeasure6":"1 cup","strMeasure7":"1\/2 tsp","strMeasure8":"1\/2 tsp","strMeasure9":"2","strMeasure10":"1 tbs chopped","strMeasure11":"2 tsp shredded","strMeasure12":"2 tbs ","strMeasure13":"1\/2 tsp","strMeasure14":"1\/2 tsp","strMeasure15":"1 tsp","strMeasure16":"1\/4 tsp","strMeasure17":"","strMeasure18":"","strMeasure19":"","strMeasure20":"","strSource":"https:\/\/www.instagram.com\/p\/BO21bpYD3Fu","strImageSource":null,"strCreativeCommonsConfirmed":null,"dateModified":null};

export { recipeChoicesBtnGroup, recipe, figure, ingredients, instructions, controlsMinusBtn, controlsPlusBtn, controlsCount };
