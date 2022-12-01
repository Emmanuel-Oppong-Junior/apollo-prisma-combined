const { gql } = require("apollo-server");
const typeDefs = gql`
  type Mutation {
    createUser(data: createUserData): User!
    updateUser(id: ID!, data: updateUserInput!): User!
    deleteUser(id: ID!): User!
    createPost(data: createPostInput!): Post!
    updatePost(id: ID!, data: updatePostInput): Post!
    deletePost(id: ID!): Post!
    createCategory(name: String!): Category!
    updateCategory(id: ID!, name: String!): Category!
    deleteCategory(id: ID!): Post!
  }
  type Query {
    getActiveUsers: [User!]!
    getDeletedUsers: [User!]!
    getUsers: [User!]!
    getUser(id: ID!): User!
    getPosts: [Post!]!
    getPost: Post!
    Posts(postFilters: PostFilters): [Post!]!
    getActivePosts: [Post!]!
    getDeletedPosts: [Post!]!
    getCategories: [Category!]!
    getActiveCategories: [Category!]!
    getDeletedCategories: [Category!]!
  }
  input PostFilters {
    id: ID
    title: String
    body: String
    cover_image: String
    created_at: String
    count: Int
    pageNum: Int
    order: Order
    categories: String
    author: Int
  }
  enum Order {
    DESC
    ASC
  }
  input updateUserInput {
    first_name: String
    last_name: String
    email: String
    password: String
    profile_image: String
    other_name: String
    phone: String
    role: Role
  }
  input createUserData {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    profile_image: String
    other_name: String
    phone: String
    role: Role
  }

  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    password: String
    profile_image: String
    tel: String
    role: Role
    other_name: String
    updated_at: String
    created_at: String
    deleted_at: String
    deleted: String
    phone: String
  }
  enum Role {
    SUPER_ADMIN
    ADMIN
    USER
    WRITER
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    cover_image: String!
    categories: [Category]
    comments: [Comments]
    deleted_at: String
    deleted: Boolean
    created_at: String
    author: User
  }

  input createPostInput {
    title: String!
    body: String!
    cover_image: String
    categories: String
    author: Int!
  }
  input updatePostInput {
    title: String
    body: String
    cover_image: String
    categories: String
  }

  type Category {
    id: ID!
    name: String
    posts: [Post!]!
    created_at: String
    updated_at: String
    deleted: Boolean
    deleted_at: String
  }
  type Comments {
    id: ID!
    message: String
    post: Post!
    user: User
    created_at: String
    updated_at: String
    deleted: Boolean
    deleted_at: String
  }
`;

module.exports = typeDefs;
