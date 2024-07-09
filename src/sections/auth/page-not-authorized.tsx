import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

const PageNotAuthorized: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }} textAlign={"center"}>
        <LockOutlined sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h2" gutterBottom>
          401
        </Typography>
        <Typography variant="h4" gutterBottom>
          Unauthorized
        </Typography>
      </Box>
    </Container>
  );
};

export default PageNotAuthorized;
