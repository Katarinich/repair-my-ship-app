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
    flexGrow: 1,
  },
  logo: {
    maxWidth: 25
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} alt="logo" className={classes.logo} />

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
    </div>
  );
}
