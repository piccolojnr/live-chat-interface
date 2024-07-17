import { Divider, Typography } from "@mui/material";
import React from "react";
import ProfileForm from "./profile-form";
import AppModal from "../../components/app-modal";
import { IUser } from "../../types";

interface ProfileSetupProps {
  user: IUser | null;
  open: boolean;
  handleClose: () => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({
  user,
  open,
  handleClose,
}) => {
  return (
    <AppModal open={open} handleClose={handleClose}>
      <>
        <Typography variant="h4">Complete Profile</Typography>
        <Divider sx={{ my: 3 }}></Divider>
        <ProfileForm user={user} handleClose={handleClose} />
      </>
    </AppModal>
  );
};

export default ProfileSetup;
