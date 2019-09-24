import React from 'react';
import { Grid } from '@material-ui/core';

import Post from '../post';

import './app.scss';

function App({ data }) {
  return (
    <Grid container spacing={24} direction="column">
      {data.posts &&
        data.posts.edges.map(post => (
          <Grid container item spacing={0} justify="center">
            <Grid item xs={12} md={6}>
              <Post post={post} key={post.id} />
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}

export default App;
