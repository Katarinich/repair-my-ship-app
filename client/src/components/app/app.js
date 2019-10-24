import React, { Component } from 'react';

import { ApolloProvider } from '@apollo/react-hoc';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline, Toolbar, Fab } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from '../header';
import PostList from '../post-list';
import ViewPost from '../view-post';
import CreateNewPost from '../create-new-post';

import theme from '../../theme';

import loadClient from '../../apollo/client';
import HideOnScroll from '../hide-on-scroll';
import OfflineMessage from '../offline-message';
import ScrollToTop from '../scroll-to-top/component';

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
            <HideOnScroll>
              <Header />
            </HideOnScroll>

            <Toolbar id="back-to-top-anchor" />

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

            <OfflineMessage />

            <ScrollToTop anchorSelector="#back-to-top-anchor">
              <Fab
                color="secondary"
                size="small"
                aria-label="scroll back to top"
              >
                <KeyboardArrowUpIcon />
              </Fab>
            </ScrollToTop>
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
