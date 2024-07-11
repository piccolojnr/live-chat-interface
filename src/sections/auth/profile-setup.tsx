import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../store";
import {
  TextField,
  Typography,
  Box,
  Stack,
  Card,
  Divider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Logo from "../../components/logo";
import { updateProfile } from "../../store/user-slice";
import InputFileUpload from "../../components/input-file-upload";
import { IUser } from "../../types";

interface ProfileSetupProps {
  user: IUser | null;
}
const ProfileSetup: React.FC<ProfileSetupProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const [bio, setBio] = useState<string>(user?.bio || "");
  const [profilePicture, setProfilePicture] = useState<string | null>(
    user?.profilePicture || null
  );
  const [error, setError] = useState<{
    bio: string | null;
    profilePicture: string | null;
    submit: string | null;
  }>({
    bio: null,
    profilePicture: null,
    submit: null,
  });
  const [loading, setLoading] = useState(false);

  const handleUpdateBio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const handleFileChange = async (file: File | null) => {
    if (file) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        setProfilePicture(data.url);
      } catch (error) {
        console.error("Error uploading image", error);
        setError((prevError) => ({
          ...prevError,
          profilePicture: "Failed to upload image",
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleProfileSetup = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await dispatch(updateProfile({ profilePicture, bio })).unwrap();
    } catch (error: any) {
      setError((prevError) => ({ ...prevError, submit: error.message }));
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/signup" />;
  }

  const renderForm = (
    <form noValidate autoComplete="off" onSubmit={handleProfileSetup}>
      <Stack spacing={3}>
        <InputFileUpload onFileChange={handleFileChange} />

        <TextField
          onFocus={() => setError({ ...error, bio: null })}
          value={bio}
          onChange={handleUpdateBio}
          name="bio"
          label="Bio"
          multiline
          rows={4}
          error={Boolean(error.bio)}
          helperText={error.bio}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          disabled={loading}
          loading={loading}
        >
          Complete Profile
        </LoadingButton>

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
          <Typography variant="h4">Complete Profile</Typography>

          <Divider sx={{ my: 3 }}></Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
};

export default ProfileSetup;
