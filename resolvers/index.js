
const Restaurant = require("./Restaurant")
const resolvers = {
	Mutation: {
		signUpRestaurant: Restaurant.signUpRestaurant
   },
   Query: {
      signIn: Restaurant.signIn
   }
};

module.exports = resolvers;