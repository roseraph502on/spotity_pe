import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider ,CssBaseline } from "@mui/material"
import theme from "./theme"
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(
  document.getElementById('content') as HTMLElement
);
const queryClient = new QueryClient({retry:1})
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <QueryClientProvider client={queryClient}>
        <App />
        </QueryClientProvider>
        
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
