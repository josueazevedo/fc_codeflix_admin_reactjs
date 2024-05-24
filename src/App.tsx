import React from "react";
import "./App.css";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import Header from "./components/Header/Header";
import { Layout } from "./components/Layout/Layout";
import { appTheme } from "./config/theme";
import { Route, Routes } from "react-router-dom";
import CategoryCreate from "./features/categories/pages/CategoryCreate/CategoryCreate";
import { CategoryEdit } from "./features/categories/pages/CategoryEdit/CategoryEdit";
import { SnackbarProvider } from "notistack";
import { CategoryList } from "./features/categories/pages/CategoryList/CategoryList";
import { CastMemberList } from "./features/cast-member/pages/CastMemberList/CastMemberList";
import { CastMemberCreate } from "./features/cast-member/pages/CastMemberCreate/CastMemberCreate";
import { CastMemberEdit } from "./features/cast-member/pages/CastMemberEdit/CastMemberEdit";
import { GenreCreate } from "./features/genre/pages/GenreCreate/GenreCreate";
import { GenreEdit } from "./features/genre/pages/GenreEdit/GenreEdit";
import { GenreList } from "./features/genre/pages/GenreList/GenreList";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box
          component="main"
          sx={{
            minHeight: "100vh",
            backgroundColor: (theme) => theme.palette.grey[900],
          }}
        >
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<CategoryList />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/create" element={<CategoryCreate />} />
              <Route path="/categories/edit/:id" element={<CategoryEdit />} />

              <Route path="/cast-members" element={<CastMemberList />} />
              <Route
                path="/cast-members/create"
                element={<CastMemberCreate />}
              />
              <Route
                path="/cast-members/edit/:id"
                element={<CastMemberEdit />}
              />

              <Route path="/gentes/create" element={<GenreCreate />} />
              <Route path="/gentes/edit" element={<GenreEdit />} />
              <Route path="/gentes" element={<GenreList />} />

              <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
