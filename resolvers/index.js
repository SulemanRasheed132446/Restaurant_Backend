
const { firestore } = require("../utils/firebase");
const Restaurant = require("./Restaurant")
const Categories = require("./Categories");
const { CategoryCollection } = require("../utils/Collections");
const resolvers = {
	Mutation: {
      signUpRestaurant: Restaurant.signUpRestaurant,
      addCategory: Categories.addCategory
   },
   Query: {
      signIn: Restaurant.signIn,
      getCategories: Categories.getCategories
   }
};

module.exports = resolvers;