
const Restaurant = require("./Restaurant")
const resolvers = {
	Mutation: {
		signUpRestaurant: Restaurant.signUpRestaurant
   },
   Query: {
      getMenu: () => '123'
   }
};

module.exports = resolvers;