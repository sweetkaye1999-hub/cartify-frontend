import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "../components/Header.jsx";
import AdminSidebar from "../components/AdminSidebar.jsx";

function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <Box
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "stretch",
        }}
      >
        <AdminSidebar />

        <Container
          component="main"
          maxWidth="lg"
          sx={{
            py: { xs: 3, md: 5 },
            flex: 1,
            minWidth: 0,
          }}
        >
          <Outlet />
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          textAlign: "center",
          py: 3,
          color: "text.secondary",
        }}
      >
        © {new Date().getFullYear()} Cartify · Product Management
      </Box>
    </Box>
  );
}

export default MainLayout;

