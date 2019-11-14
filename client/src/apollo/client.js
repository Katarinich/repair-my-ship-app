import { ApolloLink } from 'apollo-link';
// import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';

import authLink from './links/auth-link';
import tokenLink from './links/token-link';
import recaptchaLink from './links/recaptcha-link';

import { getToken, removeToken, getUser, setToken } from '../utils/auth';

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     graphQLErrors.forEach(({ message }) => {
//       if (message === 'UNAUTHENTICATED') {
//         signOut();
//       }
//     });
//   }

//   if (networkError && networkError.statusCode === 401) {
//     signOut();
//   }
// });

export default async function loadClient() {
  const apolloCache = new InMemoryCache();

  try {
    await persistCache({
      cache: apolloCache,
      storage: window.localStorage
    });
  } catch (error) {
    console.error('Error restoring Apollo cache', error);
  }

  const token = getToken();

  if (token) {
    const user = getUser(token);

    apolloCache.writeData({
      data: { loggedUser: { __typename: 'User', ...user } }
    });
  }

  const link = new HttpLink({
    uri: process.env.REACT_APP_API_URI
  });

  return new ApolloClient({
    cache: apolloCache,
    link: ApolloLink.from([
      recaptchaLink,
      authLink,
      tokenLink,
      // errorLink,
      link
    ]),
    resolvers: {
      Mutation: {
        logout: (_root, variables, { client }) => {
          removeToken();

          client.resetStore();

          return null;
        },
        setUser: (_root, { token: newToken }, { cache }) => {
          setToken(newToken);

          const user = getUser();

          cache.writeData({
            data: { loggedUser: { __typename: 'User', ...user } }
          });

          return null;
        }
      }
    }
  });
}
