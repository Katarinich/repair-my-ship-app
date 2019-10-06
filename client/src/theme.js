import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefffc',
    },
    secondary: {
      main: '#380474',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fefffc',
    },
  },
});

export default theme;
