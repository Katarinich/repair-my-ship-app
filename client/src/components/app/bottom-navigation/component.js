import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  withStyles,
  SvgIcon
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import accessControl from '../../../utils/access-control';

import { ReactComponent as CruiseIcon } from './cruise.svg';
import { ReactComponent as SignOutIcon } from './logout.svg';

const styles = theme => ({
  root: {
    top: 'auto',
    bottom: 0
  },
  bottomNavigation: {
    '& .MuiBottomNavigationAction-root.Mui-selected': {
      color: theme.palette.secondary.main
    }
  }
});

class BottomNavigationComponent extends Component {
  render() {
    const { classes, location, signOut } = this.props;

    const isAuthenticated = accessControl.isAuthenticated();

    const homeIcon = (
      <SvgIcon>
        <CruiseIcon />
      </SvgIcon>
    );

    const signOutIcon = (
      <SvgIcon>
        <SignOutIcon />
      </SvgIcon>
    );

    return (
      <AppBar position="fixed" color="primary" className={classes.root}>
        <BottomNavigation
          value={location.pathname}
          onChange={this.handleChange}
          showLabels
          className={classes.bottomNavigation}
        >
          {!isAuthenticated && (
            <BottomNavigationAction
              component={Link}
              to="/sign-up"
              value="/sign-up"
              label="Sign Up"
              icon={<PersonAddIcon />}
            />
          )}

          {isAuthenticated && (
            <BottomNavigationAction
              component={Link}
              to="/"
              value="/"
              label="Home"
              icon={homeIcon}
            />
          )}

          <BottomNavigationAction
            component={Link}
            to="/create-new-post"
            value="/create-new-post"
            label="Add Post"
            icon={<AddIcon />}
          />

          {isAuthenticated && (
            <BottomNavigationAction
              value="/logout"
              label="Logout"
              icon={signOutIcon}
              onClick={signOut}
            />
          )}

          {!isAuthenticated && (
            <BottomNavigationAction
              component={Link}
              to="/sign-in"
              value="/sign-in"
              label="Sign In"
              icon={<ExitToAppIcon />}
            />
          )}
        </BottomNavigation>
      </AppBar>
    );
  }
}

BottomNavigationComponent.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    bottomNavigation: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  signOut: PropTypes.func.isRequired
};

export default withStyles(styles)(BottomNavigationComponent);
