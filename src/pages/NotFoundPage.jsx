import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Paper
      sx={{
        p: { xs: 3, md: 5 },
        textAlign: "center",
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h2"
        color="primary.main"
        fontWeight={800}
      >
        404
      </Typography>

      <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
        Page Not Found
      </Typography>

      <Typography color="text.secondary" sx={{ my: 2 }}>
        Sorry, the page you are looking for does not exist.
      </Typography>

      <Button component={Link} to="/" variant="contained">
        Back to Product Catalog
      </Button>
    </Paper>
  );
}

export default NotFoundPage;