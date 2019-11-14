import gql from 'graphql-tag';

class AccessControl {
  init(client) {
    this.client = client;
  }

  isAuthenticated() {
    if (!this.client) {
      throw new Error(
        'You have to call the init() method in order to use Access Control'
      );
    }

    try {
      this.client.readQuery({
        query: gql`
          {
            loggedUser {
              id
              username
            }
          }
        `
      });

      return true;
    } catch (e) {
      return false;
    }
  }
}

export default new AccessControl();
