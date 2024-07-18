import { useState } from "react";
import { useDispatch } from "react-redux";
import { IUser } from "../types";
import { AppDispatch } from "../store";
import { updateProfile } from "../store/user-slice";
import API from "../lib/api";

export const useProfileSetup = (
  user: IUser | null,
  handleClose: () => void
) => {
  const dispatch = useDispatch<AppDispatch>();

  const [bio, setBio] = useState<string>(user?.bio || "");
  const [phone, setNumber] = useState<string>(user?.phone || "");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [error, setError] = useState<{
    bio: string | null;
    phone: string | null;
    profilePicture: string | null;
    submit: string | null;
  }>({
    bio: null,
    phone: null,
    profilePicture: null,
    submit: null,
  });
  const [loading, setLoading] = useState(false);

  const handleUpdateBio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  const handleFileChange = (file: File | null) => {
    setProfilePicture(file);
  };

  const handleProfileSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError({
      bio: null,
      phone: null,
      profilePicture: null,
      submit: null,
    });
    try {
      const formData = new FormData();
      formData.append("bio", bio);
      formData.append("phone", phone);

      if (profilePicture) {
        formData.append("picture", profilePicture);
      } else {
        formData.append("profilePicture", user?.profilePicture || "");
      }

      const response = await API.post("/user/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      dispatch(updateProfile(data));
      handleClose();
    } catch (error: any) {
      setError((prevError) => ({ ...prevError, submit: error.message }));
    } finally {
      setLoading(false);
    }
  };

  return {
    bio,
    phone,
    profilePicture,
    error,
    loading,
    handleUpdateBio,
    handleFileChange,
    handleProfileSetup,
    handleNumberChange,
    setError,
  };
};
