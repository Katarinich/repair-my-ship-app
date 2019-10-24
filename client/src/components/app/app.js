import React, { Component } from 'react';

import { ApolloProvider } from '@apollo/react-hoc';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline, Toolbar, Fab, Hidden } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './header';
import PostList from '../post-list';
import ViewPost from '../view-post';
import CreateNewPost from '../create-new-post';

import theme from '../../theme';

import ScrollToTop from './scroll-to-top';
import loadClient from '../../apollo/client';
import HideOnScroll from './hide-on-scroll';
import OfflineMessage from './offline-message';
import BottomNavigation from './bottom-navigation';

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

            <ScrollToTop anchorSelector="#back-to-top-anchor">
              <Fab
                color="secondary"
                size="small"
                aria-label="scroll back to top"
              >
                <KeyboardArrowUpIcon />
              </Fab>
            </ScrollToTop>

            <Hidden mdUp>
              <Toolbar />
            </Hidden>

            <OfflineMessage />

            <Hidden mdUp>
              <BottomNavigation />
            </Hidden>
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
