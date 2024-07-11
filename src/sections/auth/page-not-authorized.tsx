import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import RouterLink from "../../routes/components/router-link";
import Iconify from "../../components/iconify";

const PageNotAuthorized: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box
        component={RouterLink}
        href="/"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          m: 3,
        }}
      >
        {/* login */}
        <Iconify
          icon="lets:user"
          sx={{
            width: 32,
            height: 32,
          }}
        />
      </Box>
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
