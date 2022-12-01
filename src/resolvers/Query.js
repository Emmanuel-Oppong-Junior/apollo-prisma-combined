const excludeFields = require("../Utils/ExcludeFields");

const Query = {
  getUsers: async (_, __, { prisma }) => {
    let users = await prisma.user.findMany({
      orderBy: { id: "desc" },
    });
    users = users.map((item) => excludeFields(item, ["password"]));
    return users;
  },
  getUser: async (_, { id }, { prisma }) => {
    let user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    user = excludeFields(user, ["password"]);
    return user;
  },
  getActiveUsers: async (_, __, { prisma }) => {
    let users = await prisma.user.findMany({
      where: { deleted: false },
      orderBy: { id: "desc" },
    });
    users = users.map((item) => excludeFields(item, ["password"]));
    return users;
  },
  getDeletedUsers: async (_, __, { prisma }) => {
    let users = await prisma.user.findMany({
      where: { deleted: true },
      orderBy: { id: "desc" },
    });
    users = users.map((item) => excludeFields(item, ["password"]));
    return users;
  },
  getPosts: (_, __, { prisma }) => {
    return prisma.post.findMany({
      orderBy: { id: "desc" },
      include: { categories: true },
    });
  },
  getPost: (_, { id }, { prisma }) => {
    return prisma.post.findUnique({ where: { id: parseInt(id) } });
  },
  getActivePosts: (_, __, { prisma }) => {
    return prisma.post.findMany({
      where: { deleted: false },
      orderBy: { id: "desc" },
    });
  },
  getDeletedPosts: (_, __, { prisma }) => {
    return prisma.post.findMany({
      where: { deleted: true },
      orderBy: { id: "desc" },
    });
  },
  getCategories: (_, __, { prisma }) => {
    return prisma.category.findMany({
      orderBy: { id: "desc" },
      include: { posts: true },
    });
  },
  getActiveCategories: (_, __, { prisma }) => {
    return prisma.category.findMany({
      where: { deleted: false },
      orderBy: { id: "desc" },
    });
  },
  getDeletedCategories: (_, __, { prisma }) => {
    return prisma.category.findMany({
      where: { deleted: true },
      orderBy: { id: "desc" },
    });
  },
  Posts: async (_, { postFilters }, { prisma }) => {
    let queryOptions = {};
    if (postFilters.title)
      queryOptions.where = {
        title: { contains: postFilters.title, mode: "insensitive" },
      };
    if (postFilters.body)
      queryOptions.where = {
        body: { contains: postFilters.body, mode: "insensitive" },
      };
    if (postFilters.authorId)
      queryOptions.where = { authorId: parseInt(postFilters.authorId) };
    //order by
    if (postFilters.orderBy) {
      const field = postFilters.orderBy.split(",")[0].trim();
      const order = postFilters.orderBy.split(",")[1].trim();
      queryOptions.orderBy = { [field]: order };
    }
    if (postFilters.limit) {
      queryOptions.take = parseInt(postFilters.limit);
    }
    //pagination
    if (postFilters.pageNum && postFilters.limit) {
      let skip =
        (parseInt(postFilters.pageNum) - 1) * parseInt(postFilters.limit);
      queryOptions.skip = skip;
      queryOptions.take = parseInt(postFilters.limit);
    }
    const result = await prisma.post.findMany(queryOptions);
    return result;
  },
};
module.exports = Query;
