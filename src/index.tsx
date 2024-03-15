import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import store from '../src/api/store';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Root />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
