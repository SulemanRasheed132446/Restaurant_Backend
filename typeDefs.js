const { gql } = require("apollo-server");

const typeDefs = gql`
  type Restaurant {
    _id: String!
    name: String!
    email: String
    password: String
    phoneNumber: String!    
  }

  input RestaurantInput {
    name: String!
    email: String!,
    password: String!,
    phoneNumber: String! 
  }
  input SignInInput {
    email: String,
    password: String
  }
  
  type JWT {
    token: String!
  }
  type Mutation {
    signUpRestaurant(restaurantInput:RestaurantInput): JWT!
  }
  type Query {
    signIn(signInInput: SignInInput): JWT!
  }
`;

module.exports  = typeDefs