import { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useAuth();

  const navigate = useNavigate();

  // Prevent user from accessing login page if the user is already logged in
  useEffect(() => {
    if (user.id !== undefined) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard"); // Redirect to dashboard after a successful login attempt
    } catch (error) {
      if (error instanceof AxiosError) {
        alert([error.response?.data, error.response?.status]);
      }
    }
  }

  return (
    <div className="flex justify-evenly items-center gap-8">
      <form
        id="register-form"
        className="w-1/4 mx-8 shrink-0"
        onSubmit={handleSubmit}
      >
        <h1 className="font-roboto-mono text-3xl pb-4 place-self-center font-bold tracking-[0.5rem] mt-4 mb-8 border-b-2 px-8 border-black">
          LOGIN
        </h1>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="jusjus@example.com"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />

        <button type="submit">LET ME IN!</button>
        <p className="place-self-center py-4 mt-8 font-work-sans text-lg tracking-wide">
          Not a jüs chugger yet?{" "}
          <Link to={"/register"}>
            <span className="rounded-sm underline text-ash-gray-800 hover:bg-ash-gray-800 hover:text-ash-gray-200">
              Sign up here!
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
