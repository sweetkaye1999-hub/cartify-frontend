import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  Chip,
  Box,
} from "@mui/material";

import {
  EditOutlined,
  DeleteOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #E5E7EB",
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="210"
        image={product.image}
        alt={product.name}
        sx={{
          objectFit: "cover",
          bgcolor: "#F1F5F9",
        }}
      />

      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        <Chip
          label={product.category}
          size="small"
          color="primary"
          variant="outlined"
          sx={{
            mb: 1.5,
            fontWeight: 600,
            borderRadius: 1.5,
          }}
        />

        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ mb: 1, lineHeight: 1.4 }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="h5"
          color="primary.main"
          fontWeight={800}
          sx={{ mb: 1.5 }}
        >
          ₱
          {Number(product.price).toLocaleString("en-PH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 40,
            lineHeight: 1.6,
          }}
        >
          {product.description}
        </Typography>
      </CardContent>

      <Box sx={{ px: 2.5, pb: 2.5 }}>
        <Stack spacing={1.5}>
          <Button
            component={Link}
            to={`/products/${product.id}`}
            variant="contained"
            fullWidth
            startIcon={<VisibilityOutlined />}
            sx={{ py: 1.1, borderRadius: 2 }}
          >
            View Details
          </Button>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<EditOutlined />}
              onClick={() => onEdit(product)}
              fullWidth
              sx={{ borderRadius: 2 }}
            >
              Edit
            </Button>

            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteOutlined />}
              onClick={() => onDelete(product)}
              fullWidth
              sx={{ borderRadius: 2 }}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}

export default ProductCard;