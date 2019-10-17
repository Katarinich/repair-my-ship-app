import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

const PostWrapper = ({ children }) => (
  <Grid container item spacing={0} justify="center">
    <Grid item xs={12} md={6}>
      {children}
    </Grid>
  </Grid>
);

PostWrapper.defaultProps = {
  children: null
};

PostWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
};

export default PostWrapper;
