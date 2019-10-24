import React from 'react';

import { Offline } from 'react-detect-offline';
import { Typography, makeStyles } from '@material-ui/core';

import CenteringWrapper from '../centering-wrapper';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex: 10000,
    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(7)
    },
    opacity: 0.8,
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    color: theme.palette.primary.main
  }
}));

const OfflineMessage = () => {
  const classes = useStyles();

  return (
    <Offline>
      <div className={classes.root}>
        <CenteringWrapper>
          <Typography>No Internet Connection</Typography>
        </CenteringWrapper>
      </div>
    </Offline>
  );
};

export default OfflineMessage;
