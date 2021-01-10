const Restaurant = require("./Restaurant")
const Dishes = require("./Dishes")
const Categories = require("./Categories");

const resolvers = {
	Mutation: {
      signUpRestaurant: Restaurant.signUpRestaurant,
      addCategory: Categories.addCategory,
      addDish: Dishes.addDish,
      deleteDish:  Dishes.deleteDish,
      deleteCategory: Categories.deleteCategory
   },
   Query: {
      signIn: Restaurant.signIn,
      getCategories: Categories.getCategories,
      getDishes: Dishes.getDishes
   }
};

module.exports = resolvers;