import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

import { TextInput } from '../../common/form';

const SignInSchema = Yup.object().shape({
  login: Yup.string().required('Required'),
  password: Yup.string().required('Required')
});

export default class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInputLabelByName(name) {
    const labelsByName = {
      login: 'Username or email',
      password: 'Password'
    };

    return labelsByName[name];
  }

  handleSubmit(values, { setSubmitting }) {
    const { onSubmit } = this.props;

    onSubmit(values, setSubmitting);
  }

  render() {
    return (
      <Formik
        initialValues={{ login: '', password: '' }}
        validationSchema={SignInSchema}
        onSubmit={this.handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Field
              name="login"
              component={TextInput}
              label={this.getInputLabelByName('login')}
            />

            <Field
              name="password"
              component={TextInput}
              label={this.getInputLabelByName('password')}
              type="password"
            />

            <Button
              variant="contained"
              color="default"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    );
  }
}

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
