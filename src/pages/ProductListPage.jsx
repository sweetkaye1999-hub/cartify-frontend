import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";

import { AddOutlined, Inventory2Outlined } from "@mui/icons-material";

import ProductCard from "../components/ProductCard.jsx";
import ProductFormDialog from "../components/ProductFormDialog.jsx";
import DeleteProductDialog from "../components/DeleteProductDialog.jsx";

function ProductListPage({
  products,
  categories: apiCategories = [],
  loading,
  error,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  const categories = [
    "All",
    ...new Set(apiCategories.map((category) => category.name)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.name.localeCompare(b.name);

      case "name-desc":
        return b.name.localeCompare(a.name);

      case "price-asc":
        return Number(a.price) - Number(b.price);

      case "price-desc":
        return Number(b.price) - Number(a.price);

      default:
        return 0;
    }
  });

  const handleAdd = () => {
    setProductToEdit(null);
    setFormOpen(true);
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
    setFormOpen(true);
  };

  const handleSave = async (productData) => {
    const success = productToEdit
      ? await onUpdateProduct(productData)
      : await onAddProduct(productData);

    if (success) {
      setFormOpen(false);
      setProductToEdit(null);
    }
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setProductToEdit(null);
  };

  const handleDeleteConfirm = async (productId) => {
    const success = await onDeleteProduct(productId);

    if (success) {
      setProductToDelete(null);
    }
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Product Catalog
          </Typography>

          <Typography color="text.secondary">
            Browse and manage your products in one place.
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<AddOutlined />}
          onClick={handleAdd}
          disabled={loading}
        >
          Add Product
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          mb: 3,
          borderRadius: 3,
        }}
      >
        <Inventory2Outlined color="primary" />

        <Typography>
          Total Products: <strong>{products.length}</strong>
        </Typography>
      </Paper>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <TextField
          fullWidth
          label="Search Products"
          placeholder="Enter product name..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <FormControl sx={{ minWidth: { xs: "100%", sm: 220 } }}>
          <InputLabel id="category-filter-label">
            Category
          </InputLabel>

          <Select
            labelId="category-filter-label"
            value={selectedCategory}
            label="Category"
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }}>
          <InputLabel id="sort-label">Sort By</InputLabel>

          <Select
            labelId="sort-label"
            value={sortOption}
            label="Sort By"
            onChange={(event) => setSortOption(event.target.value)}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="name-asc">Name: A–Z</MenuItem>
            <MenuItem value="name-desc">Name: Z–A</MenuItem>
            <MenuItem value="price-asc">Price: Low to High</MenuItem>
            <MenuItem value="price-desc">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {loading ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <CircularProgress />
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Loading products...
          </Typography>
        </Box>
      ) : products.length === 0 ? (
        <Paper sx={{ p: 5, textAlign: "center", borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom>
            No products yet
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Click Add Product to create your first product.
          </Typography>

          <Button variant="contained" onClick={handleAdd}>
            Add Product
          </Button>
        </Paper>
      ) : filteredProducts.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography variant="h6" gutterBottom>
            No products found
          </Typography>

          <Typography color="text.secondary">
            Try searching with a different product name or category.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
            },
            gap: 3,
          }}
        >
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={setProductToDelete}
            />
          ))}
        </Box>
      )}

      <ProductFormDialog
        open={formOpen}
        onClose={handleCloseForm}
        onSave={handleSave}
        productToEdit={productToEdit}
        categories={apiCategories}
      />

      <DeleteProductDialog
        open={Boolean(productToDelete)}
        product={productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
}

export default ProductListPage;

