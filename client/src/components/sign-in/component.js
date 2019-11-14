import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import SignInForm from './sign-in-form';
import MainWrapper from '../common/main-wrapper';
import PostWrapper from '../common/post-wrapper';

const styles = theme => ({
  wrapper: {
    margin: theme.spacing(1)
  }
});

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn(values, setSubmitting) {
    const { signIn, history, setUser } = this.props;

    return signIn({
      variables: {
        login: values.login,
        password: values.password
      }
    })
      .then(({ data }) => {
        const { token } = data.signIn;

        setUser({
          variables: {
            token
          }
        });

        history.push('/');
      })
      .catch(() => setSubmitting(false));
  }

  render() {
    const { classes } = this.props;

    return (
      <MainWrapper>
        <PostWrapper>
          <div className={classes.wrapper}>
            <Typography variant="h4">Sign In</Typography>
            <SignInForm onSubmit={this.handleSignIn} />
          </div>
        </PostWrapper>
      </MainWrapper>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.shape({
    wrapper: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signIn: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
};

export default withStyles(styles)(SignIn);
