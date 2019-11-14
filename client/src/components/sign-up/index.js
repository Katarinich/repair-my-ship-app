import gql from 'graphql-tag';
import { compose } from 'recompose';
import { graphql } from '@apollo/react-hoc';

import SignUp from './component';

export default compose(
  graphql(
    gql`
      mutation SetUser($token: String!) {
        setUser(token: $token) @client
      }
    `,
    { name: 'setUser' }
  ),
  graphql(
    gql`
      mutation SignUp($username: String!, $password: String!, $email: String!) {
        signUp(username: $username, password: $password, email: $email) {
          token
        }
      }
    `,
    { name: 'signUp' }
  )
)(SignUp);
