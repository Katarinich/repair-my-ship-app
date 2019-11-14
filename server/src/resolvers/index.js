import { GraphQLDateTime } from 'graphql-iso-date';

import postResolvers from './post';
import userResolvers from './user';

const customScalarResolver = {
  Date: GraphQLDateTime
};

export default [customScalarResolver, postResolvers, userResolvers];
