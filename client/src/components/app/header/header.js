import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Hidden,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import grey from '@material-ui/core/colors/grey';
import { fade, makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import ProfileIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';

import logo from './logo.png';

const drawerWidth = 240;
const avatarColor = grey[800];

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
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  drawerAvatar: {
    alignSelf: 'center',
    color: avatarColor,
    width: '50%',
    height: 'auto'
  },
  drawerUsername: {
    alignSelf: 'center',
    paddingBottom: theme.spacing(1)
  },
  drawerSettings: {
    marginTop: 'auto'
  },
  avatarIcon: {
    fontSize: '3em',
    maxWidth: 40,
    maxHeight: 40,
    color: avatarColor
  }
}));

const Header = React.forwardRef(({ data, signOut }, ref) => {
  const { loggedUser } = data;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar ref={ref}>
      <Toolbar>
        <Hidden smDown={!!loggedUser}>
          <Link to="/">
            <img src={logo} alt="logo" className={classes.logo} />
          </Link>
        </Hidden>

        {loggedUser && (
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
            >
              <AccountCircle className={classes.avatarIcon} />
            </IconButton>

            <Drawer
              className={classes.drawer}
              onClose={toggleDrawer}
              open={drawerOpen}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <div className={classes.drawerContent}>
                <AccountCircle className={classes.drawerAvatar} />
                <Typography className={classes.drawerUsername}>
                  {loggedUser.username}
                </Typography>

                <Divider />

                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <ProfileIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Messages" />
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon>
                      <BookmarksIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bookmarks" />
                  </ListItem>
                </List>

                <div className={classes.drawerSettings}>
                  <Divider />

                  <ListItem button>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItem>
                </div>
              </div>
            </Drawer>
          </Hidden>
        )}

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

          {loggedUser ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={handleClose}
                getContentAnchorEl={null}
              >
                <MenuItem
                  onClick={() => {
                    signOut();
                    handleClose();
                  }}
                >
                  Sign Out
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/sign-in">
                Sign In
              </Button>

              <Typography variant="body2">|</Typography>

              <Button color="inherit" component={Link} to="/sign-up">
                Sign Up
              </Button>
            </>
          )}
        </Hidden>
      </Toolbar>
    </AppBar>
  );
});

Header.propTypes = {
  data: PropTypes.shape({
    loggedUser: PropTypes.object
  }).isRequired,
  signOut: PropTypes.func.isRequired
};

export default Header;
