import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#FFFFFF",
        color: "#172554",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 76, gap: 2 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexGrow: 1,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <ShoppingBagOutlined
              sx={{ fontSize: 36, color: "#2457C5" }}
            />

            <Box>
              <Typography variant="h5" fontWeight={800} lineHeight={1.2}>
                Cartify
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Your everyday shopping companion
              </Typography>
            </Box>
          </Box>

          <Button
            component={RouterLink}
            to="/"
            sx={{
              color: "#2457C5",
              fontWeight: 700,
              textTransform: "none",
            }}
          >
            Home
          </Button>

          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            sx={{
              bgcolor: "#2457C5",
              borderRadius: 2,
              px: 2.5,
              textTransform: "none",
              fontWeight: 700,
              "&:hover": { bgcolor: "#193F96" },
            }}
          >
            Products
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

