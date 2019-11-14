import gql from 'graphql-tag';
import { compose } from 'recompose';
import { graphql } from '@apollo/react-hoc';

import Header from './header';

export default compose(
  graphql(
    gql`
      {
        loggedUser @client {
          id
          username
        }
      }
    `
  ),
  graphql(
    gql`
      mutation SignOut {
        logout @client
      }
    `,
    { name: 'signOut' }
  )
)(Header);
