import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export default withStyles(theme => ({
  root: {
    '& label.Mui-focused': {
      color: theme.palette.secondary.main
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main
      }
    }
  }
}))(TextField);
