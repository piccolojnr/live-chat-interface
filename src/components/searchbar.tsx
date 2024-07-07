import { Search } from "@mui/icons-material";
import { Box, Input, InputAdornment } from "@mui/material";

export default function Searchbar({
  query,
  setQuery,
  onSubmit,
}: {
  query: string;
  setQuery: (query: string) => void;
  onSubmit?: (query: string) => void;
}) {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit && onSubmit(query);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: "8px",
      }}
    >
      <Input
        fullWidth
        disableUnderline
        autoFocus
        placeholder="Search…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <Search sx={{ color: "text.disabled", width: 20, height: 20 }} />
          </InputAdornment>
        }
        sx={{
          height: 40,
          borderRadius: (theme) => theme.shape.borderRadius,
        }}
      />
    </Box>
  );
}
