import React from 'react';
import { Link } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Hidden,
  InputBase
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';

import logo from './logo.png';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  logo: {
    maxWidth: 40,
    marginRight: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
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

        <Hidden xsDown>
          <Typography className={classes.title} variant="h6" noWrap>
            Repair My Ship
          </Typography>
        </Hidden>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>

        <Hidden smDown>
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

          <Button color="inherit">Sign In</Button>
          <Typography variant="body2">|</Typography>
          <Button color="inherit">Sign Up</Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default React.forwardRef(Header);
