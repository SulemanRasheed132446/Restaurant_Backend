const Restaurant = require("./Restaurant")
const Dishes = require("./Dishes")
const Categories = require("./Categories");

const resolvers = {
	Mutation: {
      signUpRestaurant: Restaurant.signUpRestaurant,
      addCategory: Categories.addCategory,
      addDish: Dishes.addDish,
      updateDish: Dishes.update
   },
   Query: {
      signIn: Restaurant.signIn,
      getCategories: Categories.getCategories
   }
};

module.exports = resolvers;