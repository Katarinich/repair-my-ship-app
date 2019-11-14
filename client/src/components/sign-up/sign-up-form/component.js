import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

import { TextInput } from '../../common/form';

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  email: Yup.string().required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required')
});

export default class CreateNewPostForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInputLabelByName(name) {
    const labelsByName = {
      username: 'Username',
      email: 'Email',
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
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={SignUpSchema}
        onSubmit={this.handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Field
              name="username"
              component={TextInput}
              label={this.getInputLabelByName('username')}
            />

            <Field
              name="email"
              component={TextInput}
              label={this.getInputLabelByName('email')}
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
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    );
  }
}

CreateNewPostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
