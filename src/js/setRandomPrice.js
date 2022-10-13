import { priceFormatter } from "./incs.js";

const setRandomPrice = function() {
   const randomDollars = Math.round(Math.random());
   const randomCents = Math.floor(Math.random() * 100);

   const randomPrice = `${randomDollars}.${randomCents}`;

   return priceFormatter.format(randomPrice);
};

export { setRandomPrice };
