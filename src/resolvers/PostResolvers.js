const excludeFields = require("../Utils/ExcludeFields");

const PostResolvers = {
  author: async (parent, __, { prisma }) => {
    let user = await prisma.user.findUnique({
      where: {
        id: parseInt(parent.authorId),
      },
    });
    user = excludeFields(user, ["password"]);
    return user;
  },
  // categories: async (parent, __, { prisma }) => {
  //   console.log("here")
  //   console.log(parent.categories.map((item) => parseInt(item.id)));
  //   let category = await prisma.category.findMany({
  //     where: {
  //       id: {
  //         in: parent.categories.map((item) => parseInt(item.id)),
  //       },
  //     },
  //   });
  //   return category;
  // },
};
module.exports = PostResolvers;
