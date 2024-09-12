import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

interface Profile {
  firstName?: string;
  lastName?: string;
  gender?: string;
  bio?: string;
}

const DisplayProfile = () => {
  const [profile, setProfile] = useState<Profile>({});

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axiosInstance.get("user/get-profile", {
        withCredentials: true,
      });
      const data = response?.data;
      if (data !== null) {
        setProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          bio: data.bio,
        });
      }
    };

    fetchProfile();

    return () => {
      setProfile({});
    };
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <div>{profile.firstName}</div>
      <div>{profile.lastName}</div>
      <div>{profile.gender}</div>
      <div>{profile.bio}</div>
    </div>
  );
};

export default DisplayProfile;
