import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import Header from './components/Header/Header';
import { Layout } from './components/Layout/Layout';
import { appTheme } from './config/theme';
import { Route, Routes } from 'react-router-dom';
import { CategoryList } from './features/categories/CategoryList/CategoryList';
import CategoryCreate from './features/categories/CategoryCreate/CategoryCreate';
import { CategoryEdit } from './features/categories/CategoryEdit/CategoryEdit';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: "top", horizontal: 'right'}}>
        <Box 
          component="main"
          sx={{
            height: '100vh',
            backgroundColor: (theme) => theme.palette.grey[900]
          }}
        >
          <Header />
          <Layout>
          <Routes>
              <Route path='/' element={<CategoryList />} />
              <Route path='/categories' element={<CategoryList />} />
              <Route path='/categories/create' element={<CategoryCreate />} />
              <Route path='/categories/edit/:id' element={<CategoryEdit />} />

              <Route path='*' element={<h1>Page not found</h1>}/>
          </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
