import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

const emptyForm = {
  name: "",
  price: "",
  category_id: "",
  stock: "0",
  image: "",
  description: "",
};

function ProductFormDialog({
  open,
  onClose,
  onSave,
  productToEdit,
  categories = [],
}) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setForm({
        name: productToEdit.name ?? "",
        price: String(productToEdit.price ?? ""),
        category_id: String(
          productToEdit.category_id ??
          categories.find(
            (category) =>
              category.name === productToEdit.category
          )?.id ??
          ""
        ),
        stock: String(productToEdit.stock ?? 0),
        image: productToEdit.image ?? "",
        description: productToEdit.description ?? "",
      });
    } else {
      setForm(emptyForm);
    }

    setErrors({});
  }, [productToEdit, open, categories]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Product name is required.";
    }

    if (
      form.price.trim() === "" ||
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) < 0
    ) {
      newErrors.price = "Enter a valid price of 0 or more.";
    }

    if (!form.category_id) {
      newErrors.category_id = "Please select a category.";
    }

    if (
      form.stock.trim() === "" ||
      !Number.isInteger(Number(form.stock)) ||
      Number(form.stock) < 0
    ) {
      newErrors.stock = "Enter a valid stock quantity.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);

    const productData = {
      ...(productToEdit ? { id: productToEdit.id } : {}),
      name: form.name.trim(),
      category_id: Number(form.category_id),
      price: Number(form.price),
      stock: Number(form.stock),
      image: form.image.trim() || null,
      description: form.description.trim() || null,
    };

    try {
      const success = await onSave(productData);

      if (success) {
        onClose();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {productToEdit ? "Edit Product" : "Add New Product"}
      </DialogTitle>

      <form onSubmit={handleSubmit} noValidate>
        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField
              name="name"
              label="Product Name"
              value={form.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              required
              fullWidth
            />

            <TextField
              name="price"
              label="Price (₱)"
              type="number"
              value={form.price}
              onChange={handleChange}
              error={Boolean(errors.price)}
              helperText={errors.price}
              slotProps={{
                htmlInput: { min: 0, step: "0.01" },
              }}
              required
              fullWidth
            />

            <TextField
              name="category_id"
              label="Category"
              select
              value={form.category_id}
              onChange={handleChange}
              error={Boolean(errors.category_id)}
              helperText={errors.category_id}
              required
              fullWidth
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.id}
                  value={String(category.id)}
                >
                  {category.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              name="stock"
              label="Stock Quantity"
              type="number"
              value={form.stock}
              onChange={handleChange}
              error={Boolean(errors.stock)}
              helperText={errors.stock}
              slotProps={{
                htmlInput: { min: 0, step: 1 },
              }}
              required
              fullWidth
            />

            <TextField
              name="image"
              label="Image URL (optional)"
              value={form.image}
              onChange={handleChange}
              fullWidth
              helperText="Leave blank if no product image is available."
            />

            <TextField
              name="description"
              label="Description"
              value={form.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={onClose}
            color="inherit"
            disabled={saving}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : productToEdit
                ? "Save Changes"
                : "Add Product"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ProductFormDialog;