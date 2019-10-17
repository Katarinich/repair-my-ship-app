import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

const CssTextField = withStyles(() => ({
  root: {
    '& label.Mui-focused': {
      color: '#380474'
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#380474'
      }
    }
  }
}))(TextField);

const PostSchema = Yup.object().shape({
  postTitle: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  postText: Yup.string().required('Required')
});

export default class CreateNewPostForm extends Component {
  constructor(props) {
    super(props);

    this.renderTextArea = this.renderTextArea.bind(this);
    this.renderTextInput = this.renderTextInput.bind(this);
  }

  getInputLabelByName(name) {
    const labelsByName = {
      postTitle: 'Title',
      postText: 'Text'
    };

    return labelsByName[name];
  }

  renderTextInput({ field, form }) {
    const { name } = field;
    const { errors, touched } = form;

    const isError = errors[name] && touched[name];

    return (
      <CssTextField
        {...field}
        error={isError}
        helperText={isError ? errors[name] : ''}
        label={this.getInputLabelByName(name)}
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      />
    );
  }

  renderTextArea({ field, form }) {
    const { name } = field;
    const { errors, touched } = form;

    const isError = errors[name] && touched[name];

    return (
      <CssTextField
        {...field}
        error={isError}
        helperText={isError ? errors[name] : ''}
        label={this.getInputLabelByName(name)}
        multiline
        fullWidth
        rows="4"
        rowsMax="4"
        margin="normal"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
    );
  }

  render() {
    const { onSubmit } = this.props;

    return (
      <Formik
        initialValues={{ postText: '', postTitle: '' }}
        validationSchema={PostSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Field
              name="postTitle"
              label="Title"
              render={this.renderTextInput}
            />

            <Field name="postText" render={this.renderTextArea} />

            <Button
              variant="contained"
              color="default"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Submit
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
