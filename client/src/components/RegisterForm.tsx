import { AxiosError } from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isEmail, isStrongPassword } from "validator";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../utils/axios";

type FormValidity = {
  email?: boolean;
  password?: {
    length?: boolean;
    lowercase?: boolean;
    uppercase?: boolean;
    number?: boolean;
    symbol?: boolean;
  };
  confirmation?: boolean;
};

const formMessage = {
  email: "Invalid email format.",
  passwordLength: "be at least 8 characters long",
  passwordLowercase: "contain a lowercase",
  passwordUppercase: "contain an uppercase",
  passwordNumber: "contain a number",
  passwordSymbol: "contain a symbol",
  confirmation: "The password confirmation does not match.",
};

const passwordRequirementClass = {
  satisfied: "text-green-600 list-['✔️'] ml-5",
  notSatisfied: "text-red-600 list-['❌'] ml-5",
};

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [validity, setValidity] = useState<FormValidity>({});

  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user.id) {
      navigate("/dashboard");
    }
  })

  function checkValidForm(): boolean {
    return (
      isEmail(email) && isStrongPassword(password) && password === confirmation
    );
  }

  /* ---------- HANDLERS ---------- */
  function handlePassword(passwordInput: string): void {
    setPassword(() => passwordInput);

    // Check if the password satisfies the requirements:
    // at least 8 characters, 1 lowercase, 1 uppercase, 1 number, and 1 symbol.
    setValidity((prevState) => ({
      ...prevState,
      password: {
        ...prevState.password,
        length: passwordInput.length < 8 ? false : true,
        lowercase: !passwordInput.match(/[a-z]/g) ? false : true,
        uppercase: !passwordInput.match(/[A-Z]/g) ? false : true,
        number: !passwordInput.match(/[0-9]/g) ? false : true,
        symbol: !passwordInput.match(/[-#!$@£%^&*()_+|~=`{}[\]:";'<>?,./\\ ]/g)
          ? false
          : true,
      },
    }));
  }

  function handleEmail(emailInput: string): void {
    setEmail(() => emailInput);

    setValidity((prevState) => ({
      ...prevState,
      email: !isEmail(emailInput) ? false : true,
    }));
  }

  function handleConfirmation(confirmationInput: string): void {
    setConfirmation(() => confirmationInput);

    setValidity((prevState) => ({
      ...prevState,
      confirmation: confirmationInput !== password ? false : true,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!checkValidForm()) {
      alert("Invalid form");
      return;
    }

    // Submit the valid form to the register API in the back-end
    try {
      const response = await axiosInstance.post(
        "/user/register",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      alert(JSON.stringify(response.data));
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response?.data instanceof Object &&
          Object.prototype.hasOwnProperty.call(error.response?.data, "errors")
        ) {
          alert(error.response?.data.errors[0].msg);
        }
      }
      else {
        alert(error);
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
          REGISTER
        </h1>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
          type="email"
          placeholder="jusjus@example.com"
          required
        />
        {("email" in validity && !validity.email) && (
          <span className="font-work-sans text-red-600 pb-4">{ formMessage.email }</span>
        )}
        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          type="password"
          required
        />
        {passwordFocus && (
          <ul className={`pb-4 font-work-sans`}>
            <span className="text-lg">Password must:</span>
            {validity.password?.length ? (
              <li className={passwordRequirementClass.satisfied}>
                <span className="pl-1">{`${formMessage.passwordLength}`}</span>
              </li>
            ) : (
              <li className={passwordRequirementClass.notSatisfied}>
                <span className="pl-1">{`${formMessage.passwordLength}`}</span>
              </li>
            )}
            {validity.password?.lowercase ? (
              <li className={passwordRequirementClass.satisfied}>
                <span className="pl-1">{`${formMessage.passwordLowercase}`}</span>
              </li>
            ) : (
              <li className={passwordRequirementClass.notSatisfied}>
                <span className="pl-1">{`${formMessage.passwordLowercase}`}</span>
              </li>
            )}
            {validity.password?.uppercase ? (
              <li className={passwordRequirementClass.satisfied}>
                <span className="pl-1">{`${formMessage.passwordUppercase}`}</span>
              </li>
            ) : (
              <li className={passwordRequirementClass.notSatisfied}>
                <span className="pl-1">{`${formMessage.passwordUppercase}`}</span>
              </li>
            )}
            {validity.password?.number ? (
              <li className={passwordRequirementClass.satisfied}>
                <span className="pl-1">{`${formMessage.passwordNumber}`}</span>
              </li>
            ) : (
              <li className={passwordRequirementClass.notSatisfied}>
                <span className="pl-1">{`${formMessage.passwordNumber}`}</span>
              </li>
            )}
            {validity.password?.symbol ? (
              <li className={passwordRequirementClass.satisfied}>
                <span className="pl-1">{`${formMessage.passwordSymbol}`}</span>
              </li>
            ) : (
              <li className={passwordRequirementClass.notSatisfied}>
                <span className="pl-1">{`${formMessage.passwordSymbol}`}</span>
              </li>
            )}
          </ul>
        )}

        <label htmlFor="confirmation">Password confirmation</label>
        <input
          value={confirmation}
          onChange={(e) => handleConfirmation(e.target.value)}
          type="password"
          required
        />
        {("confirmation" in validity && !validity.confirmation) && (
          <span className="font-work-sans text-red-600">{ formMessage.confirmation }</span>
        )}

        <button type="submit">SIGN ME UP!</button>
        <p className="place-self-center py-4 mt-8 font-work-sans text-lg tracking-wide">
          Already a jüs chugger?{" "}
          <Link to={"/login"}>
            <span className="rounded-sm underline text-ash-gray-800 hover:bg-ash-gray-800 hover:text-ash-gray-200">
              Log in here!
            </span>
          </Link>
        </p>
      </form>
      <div
        id="register-perks"
        className="p-8 m-8 w-fit max-w-2xl grow-0 self-start"
      >
        <h1 className="font-overlock font-bold text-4xl mt-[-1rem] mb-6">
          By joining us, you{" "}
          <span className="underline underline-offset-4 text-feldgrau">
            immediately
          </span>{" "}
          get:
        </h1>
        <ul className="flex flex-col gap-6">
          <li className="flex flex-row justify-start items-center gap-6 font-overlock text-2xl">
            <i className="icon-[fa6-solid--medal] size-12 shrink-0"></i>
            <p className="break-normal text-justify">
              Loyalty points with every purchase that can be exchanged with more
              <span className="font-bold text-feldgrau"> jüs </span>to satisfy
              your thirst and crush your goals.
            </p>
          </li>
          <li className="flex flex-row justify-start items-center gap-6 font-overlock text-2xl">
            <i className="icon-[fa6-solid--chart-line] size-12 shrink-0"></i>
            <p className="break-normal text-justify">
              Continuous real-time monitoring that ensures you will never have
              your own peace of mind anymore as we constantly barrage you with
              notifications to drink our nasty (and delicious){" "}
              <span className="font-bold text-feldgrau">jüs</span>.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RegisterForm;
