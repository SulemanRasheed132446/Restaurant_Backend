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
    sizes: [Size!],
    categoryId: ID!

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
  input UpdateDish {
    dishID: ID!
    name: String!
    price: Int!
    multipleSize: Boolean!
    sizes: [SizeInput!]!,
    image: Upload,
  }
  type JWT {
    token: String!
  }
  enum ORDER_STATUS {
    PENDING
    PREPARING
    DELIVERED,
  }

  input OrderDishInput {
    _id:ID!
    name:String!
    image: String!
    price: Int!
    size: String
    quantity: Int!
  }
  type OrderDish {
    _id:ID!
    name:String!
    image: String!
    price: Int!
    size: String
    quantity: Int!
  }
  type Id {
    id: ID!
  }
  type Order {
    _id: ID!
    status: ORDER_STATUS!
    total: Int!
    dishes: [OrderDish!]!
  }
  
  type Mutation {
    signUpRestaurant(restaurantInput:RestaurantInput): JWT!
    addCategory(addCategoryInput: AddCategoryInput): Category!
    addDish(addDishInput: AddDishInput): Dish!
    deleteDish(dishId: ID!, categoryId:ID!) : Id!
    updateDish(updateDish: UpdateDish): Dish!
    createOrder(restaurantId:ID!, dishes:[OrderDishInput!]!, tableNo:Int!, total:Int!): Order!
    deleteCategory(categoryId: ID!) : Id!
    updateOrder(orderId: ID!, status: ORDER_STATUS!): Id!
  }
  type Query {
    signIn(signInInput: SignInInput): JWT!
    getCategories(restaurantId: ID!): [Category!]
    getDishes(categoryId: ID!): [Dish!]
  }
  type Subscription {
    subscribeOrderByRestaurant(restaurantId: ID!):Order!
    subscribeOrderByCustomer(orderId: ID!):Order!
  }
`;

module.exports  = typeDefs