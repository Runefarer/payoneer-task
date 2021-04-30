import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#90CAF9',
      main: '#42A5F5',
      dark: '#1E88E5',
    },
    secondary: {
      light: '#F48FB1',
      main: '#EC407A',
      dark: '#D81B60',
    },
  },
});

export default theme;
