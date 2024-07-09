import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../store";
import { login } from "../../store/user-slice";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Stack,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Link,
  alpha,
  Card,
  Divider,
} from "@mui/material";
import Iconify from "../../components/iconify";
import { LoadingButton } from "@mui/lab";
import { bgGradient } from "../../theme/css";
import { useTheme } from "../../theme";

const Login: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<{
    username: string | null;
    password: string | null;
    submit: string | null;
  }>({
    username: null,
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password, rememberMe })).catch((error) => {
      setError({ ...error, submit: error.message });
    });
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  const renderForm = (
    <form noValidate autoComplete="off" onSubmit={handleLogin}>
      <Stack spacing={3}>
        <TextField
          onFocus={() => setError({ ...error, username: null })}
          value={username}
          onChange={handleUpdateEmail}
          name="username"
          label="Email address"
          error={Boolean(error.username)}
          helperText={error.username}
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
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-between"
        sx={{ my: 3, width: "100%", justifyContent: "space-between" }}
      >
        <FormControlLabel
          label="remember me"
          control={
            <Checkbox
              value={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          }
        />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        disabled={loading}
        loading={loading}
      >
        Login
      </LoadingButton>

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
      {/* home button */}
      {/* {isAuthenticated && ( */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          m: 3,
        }}
        onClick={() => navigate("/")}
      >
        <Iconify
          icon="fluent:home-20-filled"
          sx={{
            color: theme.palette.primary.main,
            fontSize: 32,
            cursor: "pointer",
          }}
        />
      </Box>
      {/* )} */}

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in</Typography>

          <Divider sx={{ my: 3 }}></Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
};

export default Login;
