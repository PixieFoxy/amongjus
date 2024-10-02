import { FormEvent, useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
    bio: "",
    target: "",
  });

  // Fetch the existing profile and pre-fill the form with current profile.
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axiosInstance.get("user/get-profile", {
        withCredentials: true,
      });
      const data = response?.data;
      if (data !== null) {
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          age: data.age,
          weight: data.weight,
          height: data.height,
          bio: data.bio,
          target: data.goal ? data.goal.target : "0",
        });
      }
    };

    fetchProfile();

    return () => {
      setFormData({
        firstName: "",
        lastName: "",
        gender: "",
        age: "",
        weight: "",
        height: "",
        bio: "",
        target: "",
      });
    };
  }, []);

  function handleInputChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      // Edit the user profile based on the form.
      await axiosInstance.post(
        "/user/profile-edit",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
          age: formData.age,
          weight: formData.weight,
          height: formData.height,
          bio: formData.bio,
        },
        {
          withCredentials: true,
        }
      );
      // Edit the user goal based on the form.
      if (formData.target) {
        await axiosInstance.post(
          "/user/goal-edit",
          {
            target: formData.target,
          },
          {
            withCredentials: true,
          }
        );
      }
      // Once the profile has been updated, alert the user and navigate back to dashboard.
      alert("Profile has been updated.");
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response?.data instanceof Object &&
          Object.prototype.hasOwnProperty.call(error.response?.data, "errors")
        ) {
          alert(error.response?.data.errors[0].msg);
        }
      } else {
        alert(error);
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="p-8 font-roboto-mono font-bold tracking-[0.25em] text-4xl border-b-2 border-black">
        EDIT PROFILE
      </h1>
      <form className="gap-4" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center gap-8 w-full">
          <div className="w-1/2">
            <label htmlFor="firstName" className="p-1">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="lastName" className="p-1">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-8 w-full">
          <div className="w-1/2">
            <label htmlFor="gender" className="p-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="none">I prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="w-1/2">
            <label htmlFor="age" className="p-1">
              Age
            </label>
            <input
              id="age"
              type="number"
              min={0}
              max={200}
              required
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-8 w-full">
          <div className="w-1/2">
            <label htmlFor="weight" className="p-1">
              Weight
            </label>
            <div className="flex justify-between items-baseline">
              <input
                id="weight"
                type="number"
                min={0}
                step={1}
                required
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
              />
              <span className="text-center items-center font-roboto-mono text-xl font-bold">
                kg
              </span>
            </div>
          </div>
          <div className="w-1/2">
            <label htmlFor="height" className="p-1">
              Height
            </label>
            <div className="flex justify-between items-baseline">
              <input
                id="height"
                type="number"
                min={0}
                step={1}
                required
                name="height"
                className="w-7/8"
                value={formData.height}
                onChange={handleInputChange}
              />
              <span className="text-center items-center font-roboto-mono text-xl font-bold">
                cm
              </span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="target" className="p-1">
            Goal
          </label>
          <select
            name="target"
            value={formData.target}
            onChange={handleInputChange}
            required
          >
            <option value="0">I'm not sure</option>
            <option value="1">Lose weight</option>
            <option value="2">Detoxify</option>
            <option value="3">Strengthen skin</option>
          </select>
          <p className="font-work-sans font-medium">
            The goal takes into account your gender, age, weight, and height for
            calculating your recommended daily nutrition intake.
          </p>
        </div>
        <div className="w-full">
          <label htmlFor="bio" className="p-1">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            autoComplete="false"
            rows={4}
            wrap="soft"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="If the world wants to know you through words, what would you write?"
          />
        </div>
        <button type="submit">SAVE CHANGES</button>
      </form>
    </div>
  );
};

export default EditProfile;
