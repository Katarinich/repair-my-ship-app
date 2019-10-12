import React, { Component } from 'react';

import { ApolloProvider } from '@apollo/react-hoc';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { persistCache } from 'apollo-cache-persist';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from '../header';
import PostList from '../post-list';
import ViewPost from '../view-post';
import CreateNewPost from '../create-new-post';

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

          <Router>
            <Header />

            <Switch>
              <Route path="/create-new-post" component={CreateNewPost} />

              <Route
                path="/post/:id"
                children={({ match }) => <ViewPost id={match.params.id} />}
              />

              <Route path="/">
                <PostList />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
