import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../store";
import { register } from "../../store/user-slice";
import {
  TextField,
  Typography,
  Box,
  Stack,
  InputAdornment,
  IconButton,
  Link,
  alpha,
  Card,
  Divider,
} from "@mui/material";
import Iconify from "../../components/iconify";
import { LoadingButton } from "@mui/lab";
import { bgGradient } from "../../theme/css";
import { useTheme } from "../../theme";
import Logo from "../../components/logo";
import RouterLink from "../../routes/components/router-link";

const Signup: React.FC = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<{
    username: string | null;
    phone: string | null;
    password: string | null;
    submit: string | null;
  }>({
    username: null,
    phone: null,
    password: null,
    submit: null,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleUpdateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleUpdatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const validate = () => {
    let isValid = true;

    // username validation
    if (username.length < 6) {
      setError((prevError) => ({
        ...prevError,
        username: "Username must be at least 6 characters long.",
      }));
      isValid = false;
    }

    // password validation
    if (password.length < 8) {
      setError((prevError) => ({
        ...prevError,
        password: "Password must be at least 8 characters long.",
      }));
      isValid = false;
    }

    // phone validation (assuming phone is optional but must be numeric if provided)
    if (phone && !/^\d+$/.test(phone)) {
      setError((prevError) => ({
        ...prevError,
        phone: "Phone number must be numeric.",
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await dispatch(
        register({ username, password, phone, bio: null, profilePicture: null })
      ).unwrap();
    } catch (error: any) {
      setError((prevError) => ({ ...prevError, submit: error.message }));
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/profile-setup" />;
  }

  const renderForm = (
    <form noValidate autoComplete="off" onSubmit={handleSignup}>
      <Stack spacing={3}>
        <TextField
          onFocus={() => setError({ ...error, username: null })}
          value={username}
          onChange={handleUpdateEmail}
          name="username"
          label="Username"
          error={Boolean(error.username)}
          helperText={error.username}
        />

        <TextField
          onFocus={() => setError({ ...error, phone: null })}
          value={phone}
          type="number"
          onChange={(e) => setPhone(e.target.value)}
          name="phone"
          label="Phone"
          error={Boolean(error.phone)}
          helperText={error.phone}
        />

        <TextField
          onFocus={() => setError({ ...error, password: null })}
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handleUpdatePassword}
          error={Boolean(error.password)}
          helperText={error.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          disabled={loading}
          loading={loading}
        >
          Signup
        </LoadingButton>

        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography
            variant="subtitle2"
            sx={{
              mt: 2,
            }}
          >
            Already have an account?{" "}
            <Link
              variant="subtitle2"
              underline="hover"
              component={RouterLink}
              href="/login"
            >
              Login
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography
            variant="subtitle2"
            color="error"
            sx={{
              mt: 2,
            }}
          >
            {error.submit}
          </Typography>
        </Stack>
      </Stack>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: "/assets/background/overlay_4.jpg",
        }),
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Logo
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          m: 3,
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign up</Typography>

          <Divider sx={{ my: 3 }}></Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
};

export default Signup;
