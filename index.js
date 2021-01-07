const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./typeDefs')
const firebase = require('firebase');
var firebaseConfig = {
    apiKey: "AIzaSyCY52m1C3amEybPtdN8vQlcyyo4gaJMr1w",
    authDomain: "restaurant-dev-3c85f.firebaseapp.com",
    projectId: "restaurant-dev-3c85f",
    storageBucket: "restaurant-dev-3c85f.appspot.com",
    messagingSenderId: "380460741012",
    appId: "1:380460741012:web:8ac6f740d4a30de14e1f81",
    measurementId: "G-W2D2XC70HQ"
};
firebase.default.initializeApp(firebaseConfig)
  // Initialize Firebase
  // A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.


const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
];

  // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      books: () => books,
    },
  };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});