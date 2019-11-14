import { ApolloLink } from 'apollo-link';

import { getToken } from '../../utils/auth';

export default new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = getToken();

    if (token) {
      return { headers: { ...headers, 'x-token': token } };
    }

    return { headers };
  });

  return forward(operation);
});
