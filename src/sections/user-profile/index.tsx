import React from "react";
import { Container, Typography, Box, Avatar } from "@mui/material";

const UserProfile: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Avatar sx={{ width: 100, height: 100, mx: "auto" }}>U</Avatar>
        <Typography variant="h4" gutterBottom>
          Username
        </Typography>
        <Typography variant="body1">
          Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          scelerisque urna et turpis fermentum, non facilisis libero tincidunt.
        </Typography>
      </Box>
    </Container>
  );
};

export default UserProfile;
