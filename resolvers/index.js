const Restaurant = require("./Restaurant")

const Categories = require("./Categories")
const Dishes = require("./Dishes")
const Categories = require("./Categories");

const resolvers = {
	Mutation: {
      signUpRestaurant: Restaurant.signUpRestaurant,
      addCategory: Categories.addCategory,
      addDish: Dishes.addDish
   },
   Query: {
      signIn: Restaurant.signIn,
      getCategories: Categories.getCategories
   }
};

module.exports = resolvers;