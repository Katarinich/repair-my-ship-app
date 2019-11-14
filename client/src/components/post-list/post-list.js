import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import InfiniteScroll from 'react-infinite-scroll-component';

import Post from '../common/post';
import Loader from '../common/loader';
import MainWrapper from '../common/main-wrapper';
import PostWrapper from '../common/post-wrapper';
import CenteringWrapper from '../common/centering-wrapper';

const styles = theme => ({
  loaderWrapper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
  }
});

class PostList extends Component {
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
      data: { posts, loading },
      classes
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

        {loading && (
          <div className={classes.loaderWrapper}>
            <Loader />
          </div>
        )}
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
      ),
      pageInfo: PropTypes.shape({
        endCursor: PropTypes.string,
        hasNextPage: PropTypes.bool.isRequired
      }).isRequired
    }),
    loading: PropTypes.bool.isRequired,
    fetchMore: PropTypes.func.isRequired
  }).isRequired,
  classes: PropTypes.shape({ loaderWrapper: PropTypes.string.isRequired })
    .isRequired
};

export default withStyles(styles)(PostList);
