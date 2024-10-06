// Import GraphQL type definitions from the typeDefs module
const typeDefs = require('./typeDefs');
// Import resolvers for handling GraphQL queries and mutations from the resolvers module
const resolvers = require('./resolvers');

// Export the type definitions and resolvers as an object for use in the Apollo Server setup
module.exports = { typeDefs, resolvers };

