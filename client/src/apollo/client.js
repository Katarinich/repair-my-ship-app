import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';

import recaptchaLink from './links/recaptchaLink';

export default async function loadClient() {
  const cache = new InMemoryCache();

  try {
    await persistCache({
      cache,
      storage: window.localStorage
    });
  } catch (error) {
    console.error('Error restoring Apollo cache', error);
  }

  const link = new HttpLink({
    uri: process.env.REACT_APP_API_URI
  });

  return new ApolloClient({
    cache,
    link: ApolloLink.from([recaptchaLink, link])
  });
}
