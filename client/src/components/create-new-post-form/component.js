import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
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

const styles = theme => ({
  recaptchaWrapper: {
    marginBottom: theme.spacing(1)
  }
});

const PostSchema = Yup.object().shape({
  postTitle: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  postText: Yup.string().required('Required')
});

class CreateNewPostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recaptcha: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderTextArea = this.renderTextArea.bind(this);
    this.renderTextInput = this.renderTextInput.bind(this);
    this.handleRecaptchaChange = this.handleRecaptchaChange.bind(this);
  }

  getInputLabelByName(name) {
    const labelsByName = {
      postTitle: 'Title',
      postText: 'Text'
    };

    return labelsByName[name];
  }

  handleSubmit(values) {
    const { onSubmit } = this.props;
    const { recaptcha } = this.state;

    onSubmit(values, recaptcha);
  }

  handleRecaptchaChange(value) {
    this.setState({ recaptcha: value });
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
    const { classes } = this.props;
    const { recaptcha } = this.state;

    return (
      <Formik
        initialValues={{ postText: '', postTitle: '' }}
        validationSchema={PostSchema}
        onSubmit={this.handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Field
              name="postTitle"
              label="Title"
              render={this.renderTextInput}
            />

            <Field name="postText" render={this.renderTextArea} />

            <div className={classes.recaptchaWrapper}>
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_API_KEY}
                onChange={this.handleRecaptchaChange}
              />
            </div>

            <Button
              variant="contained"
              color="default"
              type="submit"
              disabled={isSubmitting || !isValid || !recaptcha}
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
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({ recaptchaWrapper: PropTypes.string.isRequired })
    .isRequired
};

export default withStyles(styles)(CreateNewPostForm);
