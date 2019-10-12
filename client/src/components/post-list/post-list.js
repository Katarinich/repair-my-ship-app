import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import Post from '../post';

function PostList({ data }) {
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

PostList.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string
        })
      )
    })
  }).isRequired
};

export default PostList;
