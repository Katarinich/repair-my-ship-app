import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';

import ViewPost from './component';

export default graphql(
  gql`
    query PostQuery($id: ID!) {
      post(id: $id) {
        id
        text
        title
        createdAt
      }
    }
  `,
  {
    options: props => ({
      variables: {
        id: props.id
      },
      fetchPolicy: 'cache-and-network'
    })
  }
)(ViewPost);
