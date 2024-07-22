import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";

const Loading = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress />
    </Container>
  );
};

export default Loading;
