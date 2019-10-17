import React from 'react';
import PropTypes from 'prop-types';

import Post from '../post';
import MainWrapper from '../main-wrapper';
import PostWrapper from '../post-wrapper';

function PostList({ data }) {
  return (
    <MainWrapper>
      {data.posts &&
        data.posts.edges.map(post => (
          <PostWrapper key={post.id}>
            <Post post={post} />
          </PostWrapper>
        ))}
    </MainWrapper>
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
