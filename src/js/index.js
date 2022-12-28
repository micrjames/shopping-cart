import { recipeChoicesBtnGroup, recipe, figure, ingredients, instructions, controlsMinusBtn, controlsPlusBtn, controlsCount } from "./incs.js";
import { createBtn } from "./DOMutils.js";
import { range } from "./range.js";
import { setRecipeResult } from "./recipeResults.js";

[...range(11)].forEach(number => {
   const choiceBtn = createBtn(`recipe-choice-btn-group-${number}`, "btn");
   choiceBtn.textContent = `${number}`;

   recipeChoicesBtnGroup.appendChild(choiceBtn);
});

setRecipeResult({figure, ingredients, instructions}, recipe);

controlsCount.textContent = 0;
