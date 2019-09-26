import React from 'react';
import { Grid } from '@material-ui/core';

import Post from '../post';

import './app.scss';

function App({ data }) {
  return (
    <Grid container direction="column">
      {data.posts &&
        data.posts.edges.map(post => (
          <Grid container item spacing={0} justify="center" key={post.id}>
            <Grid item xs={12} md={6}>
              <Post post={post} />
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}

export default App;
