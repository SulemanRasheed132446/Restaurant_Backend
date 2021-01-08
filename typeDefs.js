const { gql } = require("apollo-server");

const typeDefs = gql`
  type Restaurant {
    _id: ID!
    name: String!
    email: String
    password: String
    phoneNumber: String!    
  }
  type Category {
    _id: ID!,
    name: String!
    dishes: [Dish!]
  }

  type Dish {
    _id: ID!
    name: String!
  }

  input RestaurantInput {
    name: String!
    email: String!,
    password: String!,
    phoneNumber: String! 
  }

  input AddCategoryInput {
    restaurantId:ID!,
    name: String!
  }
  type JWT {
    token: String!
  }
  type Mutation {
    signUpRestaurant(restaurantInput:RestaurantInput): JWT!
    addCategory(addCategoryInput: AddCategoryInput): Category
  }
  type Query {
    getMenu:String
  }
`;

module.exports  = typeDefs