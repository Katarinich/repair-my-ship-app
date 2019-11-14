import gql from 'graphql-tag';
import { compose } from 'recompose';
import { graphql } from '@apollo/react-hoc';

import SignIn from './component';

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
      mutation SignIn($login: String!, $password: String!) {
        signIn(login: $login, password: $password) {
          token
        }
      }
    `,
    { name: 'signIn' }
  )
)(SignIn);
