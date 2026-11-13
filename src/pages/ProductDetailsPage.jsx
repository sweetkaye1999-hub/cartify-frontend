import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";

import {
  ArrowBackOutlined,
  Inventory2Outlined,
  LocalOfferOutlined,
} from "@mui/icons-material";

import { Link, useParams } from "react-router-dom";

function ProductDetailsPage({ products, loading }) {
  const { id } = useParams();

  const product = products.find(
    (item) => String(item.id) === id
  );
  if (loading) {
  return (
    <Box sx={{ textAlign: "center", py: 8 }}>
      <CircularProgress />
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        Loading product details...
      </Typography>
    </Box>
  );
}

  if (!product) {
    return (
      <Paper
        sx={{
          p: 5,
          textAlign: "center",
          borderRadius: 4,
        }}
      >
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Product Not Found
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          The product you are looking for does not exist.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={<ArrowBackOutlined />}
        >
          Back to Catalog
        </Button>
      </Paper>
    );
  }

  return (
    <Box>
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackOutlined />}
        sx={{ mb: 3, fontWeight: 600 }}
      >
        Back to Products
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1.1fr 0.9fr",
            },
            gap: { xs: 3, md: 5 },
            alignItems: "start",
          }}
        >
          {/* Product Image */}
          <Box
            sx={{
              bgcolor: "#F1F5F9",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={product.image || "https://placehold.co/600x450?text=No+Product+Image"}
              alt={product.name}
              sx={{
                width: "100%",
                aspectRatio: "4 / 3",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>

          {/* Product Information */}
          <Stack spacing={2.5}>
            <Box>
              <Chip
                label={product.category}
                color="primary"
                variant="outlined"
                sx={{
                  fontWeight: 700,
                  borderRadius: 1.5,
                  mb: 2,
                }}
              />

              <Typography
                variant="h3"
                component="h1"
                fontWeight={800}
                sx={{
                  fontSize: {
                    xs: "2rem",
                    md: "2.5rem",
                  },
                  lineHeight: 1.2,
                }}
              >
                {product.name}
              </Typography>
            </Box>

            <Typography
              variant="h4"
              color="primary.main"
              fontWeight={800}
            >
              ₱
              {Number(product.price).toLocaleString("en-PH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>

            <Divider />

            {/* Description */}
            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
              >
                Product Description
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  lineHeight: 1.8,
                  overflowWrap: "anywhere",
                }}
              >
                {product.description || "No description available."}
              </Typography>
            </Box>

            <Divider />

            {/* Product Information */}
            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
              >
                Product Information
              </Typography>

              <Stack spacing={2}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                >
                  <Inventory2Outlined color="primary" />

                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Product Name
                    </Typography>
                    <Typography fontWeight={600}>
                      {product.name}
                    </Typography>
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                >
                  <LocalOfferOutlined color="primary" />

                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Category
                    </Typography>
                    <Typography fontWeight={600}>
                      {product.category}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Box>

            <Button
              component={Link}
              to="/"
              variant="contained"
              size="large"
              startIcon={<ArrowBackOutlined />}
              sx={{
                alignSelf: { xs: "stretch", sm: "flex-start" },
                borderRadius: 2,
                py: 1.2,
                px: 3,
              }}
            >
              Return to Products
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

export default ProductDetailsPage;