const { ApolloServer, gql } = require("apollo-server");
const typeDefs = require("./src/schemas/schema");
const resolvers = require("./src/resolvers/resolvers");
const { createContext } = require("./src/context/context");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

const port = process.env.PORT || 5000;
server
  .listen(port)
  .then(() => {
    console.log(`live and running on http://localhost:${port}`);
  })
  .catch((err) => console.log(err));
