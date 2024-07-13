import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import Logo from "../../components/logo";

const PageNotFound: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Logo
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          m: 3,
        }}
      ></Logo>
      <Box sx={{ mt: 8 }} textAlign={"center"}>
        <ErrorOutline sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h2" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
      </Box>
    </Container>
  );
};

export default PageNotFound;
