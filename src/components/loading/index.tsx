import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
