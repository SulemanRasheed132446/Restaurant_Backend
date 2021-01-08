
const { firestore } = require("../utils/firebase");
const Restaurant = require("./Restaurant")
const Categories = require("./Categories")
const resolvers = {
	Mutation: {
      signUpRestaurant: Restaurant.signUpRestaurant,
      addCategory: Categories.addCategory
   },
   Query: {
      
   }
};

module.exports = resolvers;