import { gql } from 'apollo-server-express';

import postSchema from './post';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;


export default [linkSchema, postSchema];
