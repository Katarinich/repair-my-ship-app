import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

import logo from './logo.png';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  logo: {
    maxWidth: 40
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const Header = (props, ref) => {
  const classes = useStyles();

  return (
    <AppBar ref={ref}>
      <Toolbar>
        <Link to="/">
          <img src={logo} alt="logo" className={classes.logo} />
        </Link>

        <Typography className={classes.title} variant="h6" noWrap>
          Repair My Ship
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<AddIcon />}
          component={Link}
          to="/create-new-post"
        >
          Add Post
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default React.forwardRef(Header);
