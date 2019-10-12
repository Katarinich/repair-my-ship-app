import React, { Component } from 'react';

import { Grid } from '@material-ui/core';

import Post from '../post/';

export default class ViewPost extends Component {
  render() {
    const { data } = this.props;

    if (!data.post) {
      return null;
    }

    return (
      <Grid container direction="column">
        <Grid container item spacing={0} justify="center">
          <Grid item xs={12} md={6}>
            <Post post={data.post} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
