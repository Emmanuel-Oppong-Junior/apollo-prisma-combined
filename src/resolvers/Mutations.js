const { GraphQLError } = require("graphql");
const Yup = require("yup");
const bcrypt = require("bcrypt");
const excludeFields = require("../Utils/ExcludeFields");

const Mutation = {
  createUser: async (_, { data }, { prisma }) => {
    const findUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (findUser) throw new GraphQLError("user already exist");
    try {
      //yup validation
      const validation = Yup.object({
        email: Yup.string().email().required(),
        first_name: Yup.string().required().max(50),
        last_name: Yup.string().required().max(50),
        password: Yup.string().required().min(8).max(16),
      });
      const errors = await validation.validate(data);
      //if (errors) throw GraphQLError(errors);
      const salt = bcrypt.genSaltSync(10);
      const hashed_Password = bcrypt.hashSync(data.password, salt);
      const emailToLowerCase = data.email.toLowerCase();
      data.first_name =
        data.first_name[0].toUpperCase() +
        data.first_name.substring(1).toLowerCase();
      data.last_name =
        data.last_name[0].toUpperCase() +
        data.last_name.substring(1).toLowerCase();
      const user = await prisma.user.create({
        data: {
          ...data,
          email: emailToLowerCase,
          password: hashed_Password,
          updated_at: new Date(),
          created_at: new Date(),
        },
      });
      const result = excludeFields(user, ["password"]);
      return result;
    } catch (error) {
      throw new GraphQLError(error);
    }
  },
  updateUser: async (_, { data, id }, { prisma }) => {
    try {
      //validate input
      const validator = Yup.object({
        first_name: Yup.string().min(1).max(50),
        last_name: Yup.string().min(1).max(50),
        email: Yup.string().min(1).max(50),
        phone: Yup.string().max(15),
        other_name: Yup.string().min(1).max(50),
      });
      await validator.validate(data);
      if (data.first_name) {
        data.first_name =
          data.first_name[0].toUpperCase() +
          data.first_name.substring(1).toLowerCase();
      }
      if (data.last_name) {
        data.last_name =
          data.last_name[0].toUpperCase() +
          data.last_name.substring(1).toLowerCase();
      }

      let user = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: data,
      });
      user = excludeFields(user, ["password"]);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteUser: async (_, { id }, { prisma }) => {
    try {
      const result = prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          deleted: true,
          deleted_at: new Date(),
        },
      });
      return result;
    } catch (error) {
      throw new GraphQLError(error);
    }
  },
  createPost: async (_, { data }, { prisma }) => {
    try {
      //yup validation
      const validation = Yup.object({
        title: Yup.string().required(),
        body: Yup.string().required(),
      });
      await validation.validate(data);
      let post = await prisma.post.create({
        data: {
          title: data.title,
          body: data.body,
          cover_image: "cover image",
          authorId: 1,
        },
      });
      //set categories for post
      if (data.categories) {
        data = { categories: data.categories };
        data.categories = {
          set: data.categories.split(",").map((item) => ({
            id: parseInt(item),
          })),
        };
      }
      post = await prisma.post.update({
        where: { id: post.id },
        data,
        include: { categories: true },
      });

      return post;
    } catch (error) {
      throw new GraphQLError(error);
    }
  },
  updatePost: async (_, { data, id }, { prisma }) => {
    try {
      //yup validation
      const validation = Yup.object({
        title: Yup.string(),
        body: Yup.string(),
      });
      await validation.validate(data);
      if (data.categories) {
        data.categories = {
          set: data.categories.split(",").map((item) => ({
            id: parseInt(item),
          })),
        };
      }

      const post = await prisma.post.update({
        where: { id: parseInt(id) },
        data: data,
        include: {
          categories: true,
        },
      });
      return post;
    } catch (error) {
      throw new GraphQLError(error);
    }
  },
  deletePost: async (_, { id }, { prisma }) => {
    try {
      const result = prisma.post.update({
        where: { id: parseInt(id) },
        data: {
          deleted: true,
          deleted_at: new Date(),
        },
      });
      return result;
    } catch (error) {
      throw new GraphQLError(error);
    }
  },
  createCategory: async (_, { name }, { prisma }) => {
    try {
      //yup validation
      const validation = Yup.object({
        name: Yup.string().required(),
      });
      await validation.validate({ name });
      const checkName = await prisma.category.findUnique({
        where: { name: name.toLowerCase() },
      });
      if (checkName) throw new GraphQLError(`${name} already exist`);
      const category = await prisma.category.create({
        data: { name: name.toLowerCase() },
      });
      return category;
    } catch (error) {
      throw new GraphQLError(error);
    }
  },
  updateCategory: async (_, { name, id }, { prisma }) => {
    try {
      //yup validation
      const validation = Yup.object({
        name: Yup.string(),
      });
      await validation.validate({ name });
      const category = await prisma.category.update({
        where: { id: parseInt(id) },
        data: { name },
      });
      return category;
    } catch (error) {
      throw new GraphQLError(error);
    }
  },
  deleteCategory: async (_, { id }, { prisma }) => {
    try {
      const result = prisma.category.update({
        where: { id: parseInt(id) },
        data: {
          deleted: true,
          deleted_at: new Date(),
        },
      });
      return result;
    } catch (error) {
      throw new GraphQLError(error);
    }
  },
};
module.exports = Mutation;
