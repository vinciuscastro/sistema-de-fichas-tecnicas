import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    background: { default: '#e3f2fd', paper: '#ffffff' }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif'
  }
});

export default theme;
