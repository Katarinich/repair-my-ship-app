import React from 'react';
import PropTypes from 'prop-types';

import { Grid, CircularProgress, Paper } from '@material-ui/core';

import Post from '../post';

const ViewPost = ({ data }) => (
  <Grid container direction="column">
    <Grid container item spacing={0} justify="center">
      <Grid item xs={12} md={6}>
        {!data.post ? (
          <Paper>
            <CircularProgress color="secondary" />
          </Paper>
        ) : (
          <Post post={data.post} />
        )}
      </Grid>
    </Grid>
  </Grid>
);

ViewPost.propTypes = {
  data: PropTypes.shape({
    post: PropTypes.object
  }).isRequired
};

export default ViewPost;
