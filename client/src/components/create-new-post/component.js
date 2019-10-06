import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CreateNewPostForm from '../create-new-post-form';

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(1)
  }
}));

export default function CreateNewPost({ mutate }) {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid container item spacing={0} justify="center">
        <Grid item xs={12} md={6}>
          <div className={classes.wrapper}>
            <Typography variant="h4">Create New Post</Typography>
            <CreateNewPostForm onSubmit={mutate} />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
