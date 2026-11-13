import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { WarningAmberOutlined } from "@mui/icons-material";

function DeleteProductDialog({
  open,
  product,
  onClose,
  onConfirm,
}) {
  const handleConfirm = () => {
    if (product) {
      onConfirm(product.id);
    }

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <WarningAmberOutlined color="error" />
        Delete Product?
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{" "}
          <strong>{product?.name ?? "this product"}</strong>?
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>

        <Button
          onClick={handleConfirm}
          color="error"
          variant="contained"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteProductDialog;
