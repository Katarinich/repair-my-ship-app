import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';

import PostList from './post-list';

export default graphql(
  gql`
    query PostsQuery {
      posts {
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
    options: { fetchPolicy: 'cache-and-network' }
  }
)(PostList);
