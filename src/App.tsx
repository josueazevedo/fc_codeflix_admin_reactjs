import React from 'react';
import './App.css';
import { Box, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import Header from './components/Header/Header';
import { Layout } from './components/Layout/Layout';

const theme = createTheme({})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box 
        component="main"
        sx={{
          height: '100vh',
          backgroundColor: "#000"
        }}
      >
        <Header />
        <Layout>
          <h1>Olá</h1>
        </Layout>
      </Box>
    </ThemeProvider>
  );
}

export default App;
