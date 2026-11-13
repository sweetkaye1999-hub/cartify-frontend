
import { Box, Container, Typography, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        bgcolor: "#172554",
        color: "#FFFFFF",
        pt: 5,
        pb: 2,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 4,
            pb: 4,
          }}
        >
          <Box sx={{ maxWidth: 360 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <ShoppingBagOutlined sx={{ fontSize: 32, color: "#93C5FD" }} />
              <Typography variant="h5" fontWeight={800}>
                Cartify
              </Typography>
            </Stack>

            <Typography
              sx={{ mt: 2, color: "#CBD5E1", lineHeight: 1.8 }}
            >
              Discover everyday essentials in one simple and convenient
              shopping experience.
            </Typography>
          </Box>

          <Box>
            <Typography fontWeight={700} sx={{ mb: 2 }}>
              Quick Links
            </Typography>

            <Stack spacing={1.5}>
              <Link
                component={RouterLink}
                to="/"
                underline="none"
                color="#CBD5E1"
                sx={{ "&:hover": { color: "#FFFFFF" } }}
              >
                Home
              </Link>

              <Link
                component={RouterLink}
                to="/"
                underline="none"
                color="#CBD5E1"
                sx={{ "&:hover": { color: "#FFFFFF" } }}
              >
                Products
              </Link>
            </Stack>
          </Box>

          <Box>
            <Typography fontWeight={700} sx={{ mb: 2 }}>
              About Cartify
            </Typography>
            <Typography sx={{ color: "#CBD5E1", maxWidth: 260, lineHeight: 1.8 }}>
              A product catalog and management project built with React
              and Material UI.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: "1px solid #334155",
            pt: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "#CBD5E1" }}>
            © {new Date().getFullYear()} Cartify. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
