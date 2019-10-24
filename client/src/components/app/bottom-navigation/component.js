import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { AppBar, BottomNavigation, withStyles } from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
    const { classes, location } = this.props;

    return (
      <AppBar position="fixed" color="primary" className={classes.root}>
        <BottomNavigation
          value={location.pathname}
          onChange={this.handleChange}
          showLabels
          className={classes.bottomNavigation}
        >
          <BottomNavigationAction
            component={Link}
            to="/sign-up"
            value="/sign-up"
            label="Sign Up"
            icon={<PersonAddIcon />}
          />

          <BottomNavigationAction
            component={Link}
            to="/create-new-post"
            value="/create-new-post"
            label="Add Post"
            icon={<AddIcon />}
          />

          <BottomNavigationAction
            component={Link}
            to="/sign-in"
            value="/sign-in"
            label="Sign In"
            icon={<ExitToAppIcon />}
          />
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
  }).isRequired
};

export default withStyles(styles)(BottomNavigationComponent);
