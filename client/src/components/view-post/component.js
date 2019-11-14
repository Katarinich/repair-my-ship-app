import React from 'react';
import PropTypes from 'prop-types';

import { CircularProgress, Paper } from '@material-ui/core';

import Post from '../common/post';
import MainWrapper from '../common/main-wrapper';
import PostWrapper from '../common/post-wrapper';

const ViewPost = ({ data }) => (
  <MainWrapper>
    <PostWrapper>
      {!data.post ? (
        <Paper>
          <CircularProgress color="secondary" />
        </Paper>
      ) : (
        <Post post={data.post} />
      )}
    </PostWrapper>
  </MainWrapper>
);

ViewPost.propTypes = {
  data: PropTypes.shape({
    post: PropTypes.object
  }).isRequired
};

export default ViewPost;
