import React, { Component } from 'react';

import { ApolloProvider } from '@apollo/react-hoc';
import { ThemeProvider } from '@material-ui/styles';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { CssBaseline, Toolbar, Fab, Hidden } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './header';
import SignIn from '../sign-in';
import SignUp from '../sign-up';
import PostList from '../post-list';
import ViewPost from '../view-post';
import ScrollToTop from './scroll-to-top';
import HideOnScroll from './hide-on-scroll';
import OfflineMessage from './offline-message';
import CreateNewPost from '../create-new-post';
import BottomNavigation from './bottom-navigation';

import theme from '../../theme';

import loadClient from '../../apollo/client';
import accessControl from '../../utils/access-control';

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

    accessControl.init(client);

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

              <Route path="/sign-up" component={SignUp} />

              <Route path="/sign-in" component={SignIn} />

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
