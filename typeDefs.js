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
    price: Int!
    imageUrl: String!
    mutlipleSize: Boolean!
    sizes: [Size!]
  }

  type Size {
    size: String!
    price: Int!
  }
  input SizeInput {
    size: String!
    price: Int!
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

  input SignInInput {
    email: String,
    password: String
  }
  input AddDishInput {
    categoryID: ID!
    name: String!
    price: Int!
    multipleSize: Boolean!
    sizes: [SizeInput!]!,
    image: Upload!
  }

  type JWT {
    token: String!
  }

  type Id {
    id: ID!
  }
  
  type Mutation {
    signUpRestaurant(restaurantInput:RestaurantInput): JWT!
    addCategory(addCategoryInput: AddCategoryInput): Category!
    addDish(addDishInput: AddDishInput): Dish!
    deleteDish(dishID: ID!) : Id!
  }
  type Query {
    signIn(signInInput: SignInInput): JWT!
    getCategories(restaurantId: ID!): [Category!]
  }
`;

module.exports  = typeDefs