import React from 'react';
import theme from './styles/theme';
import ReactDOM from 'react-dom/client';
import GlobalStyles from './styles/global';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './hooks/auth';

import { Routes } from './routes'; //A chaves é preciso quando não estou fazendo uma importação default, ou seja, estou fazendo uma importação nomeada.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Routes />
      </AuthProvider>  
    </ThemeProvider>
  </React.StrictMode>
)
