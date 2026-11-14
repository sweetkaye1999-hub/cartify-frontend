import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function RegisterPage() {
  const navigate = useNavigate();
  const { register, login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      await login({ email, password });

      navigate("/");
    } catch (err) {
      const errors = err.response?.data?.errors;

      setError(
        errors
          ? Object.values(errors).flat().join(" ")
          : err.response?.data?.message ||
              "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "75vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{ width: "100%", maxWidth: 450, p: 4, borderRadius: 3 }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={1}>
          Create Account
        </Typography>

        <Typography color="text.secondary" textAlign="center" mb={3}>
          Join Cartify today
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            fullWidth
            required
            margin="normal"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            inputProps={{ minLength: 8 }}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={passwordConfirmation}
            onChange={(event) =>
              setPasswordConfirmation(event.target.value)
            }
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 3, py: 1.3 }}
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>
        </Box>

        <Typography textAlign="center" mt={3}>
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default RegisterPage;