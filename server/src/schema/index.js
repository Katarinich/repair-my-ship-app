import { gql } from 'apollo-server-express';

import postSchema from './post';
import userSchema from './user';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, postSchema, userSchema];
