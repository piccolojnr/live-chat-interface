import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../store";
import { register } from "../../store/user-slice";
import UploadPicture from "../../components/uploadPicture";
import {
  TextField,
  Typography,
  Box,
  Stack,
  InputAdornment,
  IconButton,
  alpha,
  Card,
  Link,
  Divider,
} from "@mui/material";
import Iconify from "../../components/iconify";
import { LoadingButton } from "@mui/lab";
import { bgGradient } from "../../theme/css";
import { useTheme } from "../../theme";

const Signup: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [Phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<{
    username: string | null;
    password: string | null;
    submit: string | null;
    email: string | null;
    confirmPassword: string | null;
  }>({
    username: null,
    password: null,
    submit: null,
    email: null,
    confirmPassword: null,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleUpdateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUpdatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUpdateConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleUpdatePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register({ username, email, password })).catch((error) => {
      setError({ ...error, submit: error.message });
    });
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  const renderForm = (
    <form noValidate autoComplete="off" onSubmit={handleRegister}>
      <Stack spacing={2.5}>
        <UploadPicture />

        <TextField 
          onFocus={() => setError({ ...error, username: null })}
          value={username}
          onChange={handleUpdateUsername}
          name="username"
          label="Username"
          error={Boolean(error.username)}
          helperText={error.username}
        />

        <TextField
          onFocus={() => setError({ ...error, email: null })}
          value={email}
          onChange={handleUpdateEmail}
          name="email"
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

        <TextField
          onFocus={() => setError({ ...error, confirmPassword: null })}
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={handleUpdateConfirmPassword}
          error={Boolean(error.confirmPassword)}
          helperText={error.confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showConfirmPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        
        <TextField
          value={Phone}
          onChange={handleUpdatePhone}
          name="phone"
          label="Phone number"
          error={Boolean(error.email)}
          helperText={error.email}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        disabled={loading}
        loading={loading}
        sx={{
          marginTop: 2,
        }}
      >
        Sign up
      </LoadingButton>

      <Divider sx={{ my: 3 }}></Divider>

      <Typography variant="subtitle2" color="text.secondary" textAlign={'center'}>
        Already have an account?{" "}
        <Link
          onClick={() => navigate("/login")}
          variant="subtitle2"
          underline="hover"
        >
          Sign in
        </Link>
      </Typography>

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
