import gql from 'graphql-tag';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { graphql } from '@apollo/react-hoc';

import BottomNavigation from './component';

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
)(withRouter(BottomNavigation));
