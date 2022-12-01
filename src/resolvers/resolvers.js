const Mutation = require("./Mutations");
const Query = require("./Query");
const PostResolvers = require("./PostResolvers");
const resolvers = {
  Mutation,
  Query,
  Post: PostResolvers,
};

module.exports = resolvers;
