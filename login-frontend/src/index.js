// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './auth/AuthContext';  // ✅ import your provider

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00bcd4' },   // cyan accent
    secondary: { main: '#ff4081' }, // neon pink accent
    background: { default: '#0b0f13', paper: '#12171c' },
    text: { primary: '#e6f7ff', secondary: '#90a4ae' },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Segoe UI, Arial, sans-serif',
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>   {/* ✅ wrap the whole app in AuthProvider */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </AuthProvider>
);