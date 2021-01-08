const { firestore, bucket } = require("../utils/firebase");
const {uploadImage} = require('../utils/Bucket')
const {DishesCollection} = require('../utils/Collections')
const Stream = require('stream')
const Restaurant = require("./Restaurant")
const Categories = require("./Categories")
const Dishes = require("./Dishes")
const resolvers = {
	Mutation: {
      signUpRestaurant: Restaurant.signUpRestaurant,
      addCategory: Categories.addCategory,
      addDish: Dishes.addDish
   },
   Query: {
      signIn: Restaurant.signIn
   }
};

module.exports = resolvers;