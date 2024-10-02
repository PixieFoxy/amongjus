import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

interface Profile {
  firstName?: string;
  lastName?: string;
  gender?: string;
  bio?: string;
}

const DisplayProfileDashboard = () => {
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
    <>
      {/* If profile is empty (i.e. user hasn't set up a profile), return reminder to set up one */}
      {Object.keys(profile).length === 0 ? (
        <div className="font-roboto-mono text-xl text-center p-8 tracking-wider border-b-2 border-timberwolf-dark">
          <p>The world wants to know you but there is nothing about you, yet.</p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="text-4xl font-work-sans font-bold p-8 tracking-wider">
            Hi, {profile.firstName} {profile.lastName}!
          </div>
          <div className="text-md font-roboto-mono font-light">
            We really liked it when you said this about yourself:
          </div>
          <div className="text-2xl font-work-sans py-2">{profile.bio}</div>
        </div>
      )}
    </>
  );
};

export default DisplayProfileDashboard;
