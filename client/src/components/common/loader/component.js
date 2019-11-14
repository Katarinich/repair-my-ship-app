import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import CenteringWrapper from '../centering-wrapper';

const Loader = () => (
  <CenteringWrapper>
    <CircularProgress color="secondary" />
  </CenteringWrapper>
);

export default Loader;
