const Restaurant = require("./Restaurant")
const Dishes = require("./Dishes")
const Order = require("./Orders")
const Categories = require("./Categories");

const resolvers = {
	Mutation: {
      signUpRestaurant: Restaurant.signUpRestaurant,
      addCategory: Categories.addCategory,
      addDish: Dishes.addDish,
      deleteDish:  Dishes.deleteDish,
      createOrder: Order.createOrder,
      deleteCategory: Categories.deleteCategory,
      updateOrder: Order.updateOrder
   },
   Query: {
      signIn: Restaurant.signIn,
      getCategories: Categories.getCategories,
      getDishes: Dishes.getDishes
   }
};

module.exports = resolvers;