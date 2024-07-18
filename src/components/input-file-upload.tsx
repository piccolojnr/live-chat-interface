import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Avatar, Stack } from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface InputFileUploadProps {
  onFileChange: (file: File | null) => void;
  file: File | null;
  placeholder?: string;
}

export default function InputFileUpload({
  onFileChange,
  file,
  placeholder,
}: InputFileUploadProps) {
  const [loading, setLoading] = useState(false);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setLoading(true);
    await onFileChange(selectedFile);
    setLoading(false);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      style={{ width: "100%" }}
    >
      <Avatar
        alt="Uploaded file"
        src={file ? URL.createObjectURL(file) : placeholder}
        sx={{
          width: 40,
          height: 40,
        }}
      />

      <LoadingButton
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        fullWidth
        size="large"
        loading={loading}
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          onChange={handleChange}
          accept="image/*"
          id="upload-button"
          name="upload-button"
        />
      </LoadingButton>
    </Stack>
  );
}
