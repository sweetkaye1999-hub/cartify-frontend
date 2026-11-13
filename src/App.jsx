import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

import api from "./api/axios.js";
import MainLayout from "./layouts/MainLayout.jsx";
import ProductListPage from "./pages/ProductListPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [notice, setNotice] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // GET: Load products and categories from Laravel
  useEffect(() => {
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
  }, []);

  const showNotice = (message, severity = "success") => {
    setNotice({
      open: true,
      message,
      severity,
    });
  };

  // POST: Add product
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

  // PUT: Update product
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

  // DELETE: Remove product
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
            element={<ProductDetailsPage 
              products={products}
              loading={loading} />}
          />

          <Route path="*" element={<NotFoundPage />} />
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
