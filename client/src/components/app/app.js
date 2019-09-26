import React, { Component } from 'react';

import { ApolloProvider } from '@apollo/react-hoc';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { persistCache } from 'apollo-cache-persist';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import PostList from '../post-list';

import theme from '../../theme';

export default class App extends Component {
  state = {
    client: null,
    loaded: false
  };

  async componentDidMount() {
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

    const client = new ApolloClient({
      cache,
      link
    });

    this.setState({
      client,
      loaded: true
    });
  }

  render() {
    const { client, loaded } = this.state;

    if (!loaded) {
      return <div>Loading...</div>;
    }

    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PostList />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
