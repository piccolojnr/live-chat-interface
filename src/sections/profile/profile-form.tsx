import React from "react";
import { TextField, Typography, Stack, Button, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { IUser } from "../../types";
import { useProfileSetup } from "../../hooks/use-profile-setup";
import InputFileUpload from "../../components/input-file-upload";

interface ProfileFormProps {
  user: IUser | null;
  handleClose: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user, handleClose }) => {
  const {
    bio,
    phone,
    profilePicture,
    error,
    setError,
    loading,
    handleUpdateBio,
    handleFileChange,
    handleProfileSetup,
    handleNumberChange,
  } = useProfileSetup(user, handleClose);

  return (
    <form noValidate autoComplete="off" onSubmit={handleProfileSetup}>
      <Stack spacing={3}>
        <InputFileUpload
          file={profilePicture}
          onFileChange={handleFileChange}
          placeholder={user?.profilePicture}
        />

        <TextField
          onFocus={() => setError({ ...error, phone: null })}
          value={phone}
          onChange={handleNumberChange}
          name="phone"
          label="Phone Number"
          error={Boolean(error.phone)}
          helperText={error.phone}
        />

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
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mt: 1,
            }}
          >
            Profile Picture and Bio are optional
          </Typography>
        </Stack>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid
            item
            sx={{
              mr: 1,
            }}
          >
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              Skip
            </Button>
          </Grid>
          <Grid
            item
            sx={{
              ml: 1,
            }}
          >
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={loading}
              loading={loading}
            >
              Edit Profile
            </LoadingButton>
          </Grid>
        </Grid>
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
};

export default ProfileForm;
