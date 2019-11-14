import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import SignUpForm from './sign-up-form';
import MainWrapper from '../common/main-wrapper';
import PostWrapper from '../common/post-wrapper';

const styles = theme => ({
  wrapper: {
    margin: theme.spacing(1)
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(values, setSubmitting) {
    const { signUp, setUser, history } = this.props;

    return signUp({
      variables: {
        username: values.username,
        email: values.email,
        password: values.password
      }
    })
      .then(({ data }) => {
        const { token } = data.signUp;

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
            <Typography variant="h4">Sign Up</Typography>
            <SignUpForm onSubmit={this.handleSignUp} />
          </div>
        </PostWrapper>
      </MainWrapper>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.shape({
    wrapper: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signUp: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
};

export default withStyles(styles)(SignUp);
