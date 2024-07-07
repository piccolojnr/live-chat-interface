import React from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const SignUp: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h2" gutterBottom>
          SignUp
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          SignUp
        </Button>
      </Box>
    </Container>
  );
};

export default SignUp;
