import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

const MainWrapper = ({ children }) => (
  <Grid container direction="column">
    {children}
  </Grid>
);

MainWrapper.defaultProps = {
  children: null
};

MainWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.array
  ])
};

export default MainWrapper;
