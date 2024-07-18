import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { login } from "../../store/user-slice";
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
  Grid,
} from "@mui/material";
import Iconify from "../../components/iconify";
import { LoadingButton } from "@mui/lab";
import { bgGradient } from "../../theme/css";
import { useTheme } from "../../theme";
import Logo from "../../components/logo";
import RouterLink from "../../routes/components/router-link";
import { registerRequest } from "../../lib/api/user";

const validatePhone = (phone: string) => {
  if (!/^\d{10}$/.test(phone)) {
    return "Invalid phone number.";
  }
};

const validateCountryCode = (countryCode: string) => {
  if (!/^\+\d{1,4}$/.test(countryCode)) {
    return "Invalid country code.";
  }
};

const validatePassword = (password: string) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
};

const validateUsername = (username: string) => {
  if (username.length < 6) {
    return "Username must be at least 6 characters long.";
  }
};

const Signup: React.FC = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+233");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<{
    username: string | null;
    phone: string | null;
    country: string | null;
    password: string | null;
    submit: string | null;
  }>({
    username: null,
    phone: null,
    country: null,
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
    const usernameError = validateUsername(username);
    if (usernameError) {
      setError((prevError) => ({ ...prevError, username: usernameError }));
      isValid = false;
    }

    // password validation
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError((prevError) => ({ ...prevError, password: passwordError }));
      isValid = false;
    }

    // country code validation
    const countryCodeError = validateCountryCode(countryCode);
    if (countryCodeError) {
      setError((prevError) => ({ ...prevError, country: countryCodeError }));
      isValid = false;
    }

    // phone validation (assuming phone is optional but must be numeric if provided)
    if (phone.length > 0) {
      const phoneError = validatePhone(phone);
      if (phoneError) {
        setError((prevError) => ({ ...prevError, phone: phoneError }));
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const number = phone ? `${countryCode + phone}` : "";

      await registerRequest(username, password, number)
        .then((data) => {
          localStorage.setItem("token", data.token);
          dispatch(login(data));
          navigate("/profile", { replace: true });
        })
        .catch((error) => {
          console.error("Error signing up:", error);
        });
    } catch (error: any) {
      setError((prevError) => ({ ...prevError, submit: error.message }));
    } finally {
      setLoading(false);
    }
  };

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
        <Grid container direction="row" wrap="nowrap">
          <Grid item xs={4} mr={1}>
            <TextField
              onFocus={() => setError({ ...error, phone: null })}
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              name="countryCode"
              label="Country Code"
              error={Boolean(error.phone)}
              helperText={error.phone}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              onFocus={() => setError({ ...error, phone: null })}
              value={phone}
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
              label="Phone"
              error={Boolean(error.phone)}
              helperText={error.phone}
            />
          </Grid>
        </Grid>

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
