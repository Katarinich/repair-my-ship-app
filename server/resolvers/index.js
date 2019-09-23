import { GraphQLDateTime } from 'graphql-iso-date';

import postResolvers from './post';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  postResolvers,
];