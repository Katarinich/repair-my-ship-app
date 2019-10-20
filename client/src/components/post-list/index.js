import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';

import PostList from './post-list';

import { DEFAULT_POST_LIST_LIMIT } from '../../constants';

export default graphql(
  gql`
    query PostsQuery($cursor: String, $limit: Int!) {
      posts(cursor: $cursor, limit: $limit) {
        edges {
          id
          text
          title
          createdAt
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `,
  {
    options: {
      variables: {
        limit: DEFAULT_POST_LIST_LIMIT
      },
      fetchPolicy: 'cache-and-network'
    }
  }
)(PostList);
