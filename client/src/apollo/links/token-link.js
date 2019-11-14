import { ApolloLink } from 'apollo-link';

import { removeToken } from '../../utils/auth';

export default new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    const {
      response: { headers }
    } = operation.getContext();

    if (headers && !headers.get('x-token')) {
      removeToken();
    }

    return response;
  })
);
