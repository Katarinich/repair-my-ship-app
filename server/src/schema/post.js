import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    posts(cursor: String, limit: Int): PostConnection!
    post(id: ID!): Post!
  }

  extend type Mutation {
    createPost(text: String, title: String): Post!
  }

  type PostConnection {
    edges: [Post!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Post {
    id: ID!
    text: String!
    title: String!
    createdAt: Date!
    updatedAt: Date!
  }
`;