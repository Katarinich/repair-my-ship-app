import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';

import Post from '../post';
import Loader from '../loader';
import MainWrapper from '../main-wrapper';
import PostWrapper from '../post-wrapper';
import CenteringWrapper from '../centering-wrapper';

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.loadMorePosts = this.loadMorePosts.bind(this);
  }

  loadMorePosts() {
    const {
      data: { posts, fetchMore }
    } = this.props;

    fetchMore({
      variables: {
        cursor: posts.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }

        return {
          posts: {
            ...fetchMoreResult.posts,
            edges: [
              ...previousResult.posts.edges,
              ...fetchMoreResult.posts.edges
            ]
          }
        };
      }
    });
  }

  renderNoPostsMessage() {
    return (
      <CenteringWrapper>
        <Typography>There is no new posts</Typography>
      </CenteringWrapper>
    );
  }

  render() {
    const {
      data: { posts, loading }
    } = this.props;

    return (
      <MainWrapper>
        <InfiniteScroll
          dataLength={posts ? posts.edges.length : 0}
          next={this.loadMorePosts}
          hasMore={posts && posts.pageInfo.hasNextPage}
          endMessage={this.renderNoPostsMessage()}
        >
          {posts &&
            posts.edges.map(post => (
              <PostWrapper key={post.id}>
                <Post post={post} />
              </PostWrapper>
            ))}
        </InfiniteScroll>

        {loading && <Loader />}
      </MainWrapper>
    );
  }
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
