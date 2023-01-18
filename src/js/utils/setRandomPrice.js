import Random from "./Random.js";

const setRandomPrice = function() {
   const randomDollars = new Random();
   const zeroOrOneRandomDollars = randomDollars.zeroOrOne;

   const randomCents = new Random(0, 100);
   const oneHundredRandomCents = randomCents.integer; 

   const randomPrice = `${zeroOrOneRandomDollars}.${oneHundredRandomCents}`;

   return randomPrice;
};

export { setRandomPrice };
