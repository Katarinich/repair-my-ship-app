import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';

import CreateNewPost from './component';

export default graphql(gql`
  mutation CreatePost($title: String!, $text: String!) {
    createPost(title: $title, text: $text) {
      id,
      title,
      text,
      createdAt,
      updatedAt
    }
  }
`)(CreateNewPost);
