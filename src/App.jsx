import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

import api from "./api/axios.js";
import { useAuth } from "./context/AuthContext.jsx";

import MainLayout from "./layouts/MainLayout.jsx";
import ProductListPage from "./pages/ProductListPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";

import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import AdminRoute from "./components/auth/AdminRoute.jsx";

function App() {
  const { isAuthenticated } = useAuth();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [notice, setNotice] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Load products only after login
  useEffect(() => {
    if (!isAuthenticated) {
      setProducts([]);
      setCategories([]);
      setLoading(false);
      setError("");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [productsResponse, categoriesResponse] =
          await Promise.all([
            api.get("/products"),
            api.get("/categories"),
          ]);

        const productData = Array.isArray(productsResponse.data)
          ? productsResponse.data
          : productsResponse.data.data ?? [];

        const categoryData = Array.isArray(categoriesResponse.data)
          ? categoriesResponse.data
          : categoriesResponse.data.data ?? [];

        const normalizedProducts = productData.map((product) => ({
          ...product,
          category: product.category?.name ?? "Uncategorized",
        }));

        setProducts(normalizedProducts);
        setCategories(categoryData);
      } catch (err) {
        console.error("Failed to load data:", err);

        setError(
          err.response?.data?.message ??
            "Unable to load products. Please check your Laravel server."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  const showNotice = (message, severity = "success") => {
    setNotice({
      open: true,
      message,
      severity,
    });
  };

  // Add product
  const addProduct = async (productData) => {
    try {
      const response = await api.post("/products", productData);

      const newProduct = {
        ...response.data,
        category:
          response.data.category?.name ??
          categories.find(
            (category) =>
              category.id === response.data.category_id
          )?.name ??
          "Uncategorized",
      };

      setProducts((current) => [...current, newProduct]);
      showNotice("Product added successfully!");
      return true;
    } catch (err) {
      console.error("Failed to add product:", err);

      showNotice(
        err.response?.data?.message ?? "Failed to add product.",
        "error"
      );

      return false;
    }
  };

  // Update product
  const updateProduct = async (productData) => {
    try {
      const response = await api.put(
        `/products/${productData.id}`,
        productData
      );

      const updatedProduct = {
        ...response.data,
        category:
          response.data.category?.name ??
          categories.find(
            (category) =>
              category.id === response.data.category_id
          )?.name ??
          productData.category ??
          "Uncategorized",
      };

      setProducts((current) =>
        current.map((product) =>
          product.id === updatedProduct.id
            ? updatedProduct
            : product
        )
      );

      showNotice("Product updated successfully!");
      return true;
    } catch (err) {
      console.error("Failed to update product:", err);

      showNotice(
        err.response?.data?.message ?? "Failed to update product.",
        "error"
      );

      return false;
    }
  };

  // Delete product
  const deleteProduct = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);

      setProducts((current) =>
        current.filter((product) => product.id !== productId)
      );

      showNotice("Product deleted successfully!");
      return true;
    } catch (err) {
      console.error("Failed to delete product:", err);

      showNotice(
        err.response?.data?.message ?? "Failed to delete product.",
        "error"
      );

      return false;
    }
  };

  return (
    <>
      <Routes>
        {/* Public authentication pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected application pages */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={
                <ProductListPage
                  products={products}
                  categories={categories}
                  loading={loading}
                  error={error}
                  onAddProduct={addProduct}
                  onUpdateProduct={updateProduct}
                  onDeleteProduct={deleteProduct}
                />
              }
            />

            <Route
              path="/products/:id"
              element={
                <ProductDetailsPage
                  products={products}
                  loading={loading}
                />
              }
            />

            {/* Admin-only route group for future admin pages */}
            <Route element={<AdminRoute />}>
              {/* Add admin-only pages here if needed */}
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>

      <Snackbar
        open={notice.open}
        autoHideDuration={4000}
        onClose={() =>
          setNotice((current) => ({
            ...current,
            open: false,
          }))
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity={notice.severity}
          variant="filled"
          onClose={() =>
            setNotice((current) => ({
              ...current,
              open: false,
            }))
          }
        >
          {notice.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;