import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import Header from './components/Header/Header';
import { Layout } from './components/Layout/Layout';
import { appTheme } from './config/theme';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Box 
        component="main"
        sx={{
          height: '100vh',
          backgroundColor: (theme) => theme.palette.grey[900]
        }}
      >
        <Header />
        <Layout>
         Teste
         <Routes>
            <Route  />
         </Routes>
        </Layout>
      </Box>
    </ThemeProvider>
  );
}

export default App;
