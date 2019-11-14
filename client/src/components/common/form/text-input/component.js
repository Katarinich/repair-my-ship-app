import React from 'react';
import PropTypes from 'prop-types';

import CssTextField from '../css-text-field';

const TextInput = ({ field, form, label, type, ...props }) => {
  const { name } = field;
  const { errors, touched } = form;

  const isError = errors[name] && touched[name];

  return (
    <CssTextField
      {...field}
      error={isError}
      helperText={isError ? errors[name] : ''}
      label={label}
      type={type}
      fullWidth
      margin="normal"
      variant="outlined"
      InputLabelProps={{
        shrink: true
      }}
      {...props}
    />
  );
};

TextInput.defaultProps = {
  label: '',
  type: 'text'
};

TextInput.propTypes = {
  field: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  form: PropTypes.shape({ errors: PropTypes.object, touched: PropTypes.object })
    .isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password'])
};

export default TextInput;
