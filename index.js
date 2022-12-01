const { ApolloServer, gql } = require("apollo-server");
const typeDefs = require("./src/schemas/schema");
const resolvers = require("./src/resolvers/resolvers");
const { createContext } = require("./src/context/context");
const errorHandler = require("./middlewares/ErrorHandlers/ErrorHandler");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
  formatError:errorHandler
});

const port = process.env.PORT || 5001;
server
  .listen(port)
  .then(() => {
    console.log(`live and running on http://localhost:${port}`);
  })
  .catch((err) => console.log(err));
