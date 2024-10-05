import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';

const theme = createTheme({
  typography: {
    fontFamily: "'Pretendard-Regular', sans-serif",
  },
  palette: {
    primary: {
      main: '#76ABAE',
      contrastText: '#fff',
    },
    secondary: {
      main: '#76AE95',
      contrastText: '#fff',
    },
    tertiary: {
      main: '#57779E',
      contrastText: '#fff',
    },
    error: {
      main: '#B32222',
      contrastText: '#fff',
    },
    neutral: {
      // 취소 버튼 색상
      main: '#9F9693',
      contrastText: '#fff',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
  /* </React.StrictMode> */
);
