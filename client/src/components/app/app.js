import React, { Component } from 'react';

import { ApolloProvider } from '@apollo/react-hoc';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from '../header';
import PostList from '../post-list';
import ViewPost from '../view-post';
import CreateNewPost from '../create-new-post';

import theme from '../../theme';

import loadClient from '../../apollo/client';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client: null,
      loaded: false
    };
  }

  async componentDidMount() {
    const client = await loadClient();

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
                render={({ match }) => <ViewPost id={match.params.id} />}
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
