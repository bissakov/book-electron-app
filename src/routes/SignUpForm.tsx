import { useState } from "react";
import { FormInputProps } from "../types/types";
import { Link } from "react-router-dom";

const SignUpFormInput = ({
  name,
  placeholder,
  onChange,
  value,
  errorMessage,
}: FormInputProps) => {
  return (
    <div className="flex w-full flex-col">
      <input
        className="rounded-md border-2 border-solid border-purple-950 p-2 focus:border-purple-500 focus:outline-none"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <div className="my-2 text-xs text-red-400">{errorMessage}</div>
    </div>
  );
};

const SignUpForm = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: `Min. 6 chars; no spaces/specials.`,
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "text",
      placeholder: "Email",
      errorMessage: "Must be a valid email.",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: `Min. 8 chars; 1 uppercase, 1 lowercase, 1 number, 1 special.`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords must match.",
      required: true,
    },
  ];

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log({ [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      className="flex w-96 flex-col items-center rounded-2xl bg-white px-8 py-4 shadow-2xl"
      onSubmit={handleSubmit}
    >
      <div className="mb-4 text-center text-3xl font-bold text-purple-900">
        Sign-Up
      </div>
      {inputs.map((input) => (
        <SignUpFormInput
          key={input.id}
          {...input}
          value={values[input.name as keyof typeof values]}
          onChange={onChange}
        />
      ))}
      <button className="w-full rounded-md bg-purple-900 p-4 text-lg font-bold text-white shadow-inner hover:bg-purple-800">
        Submit
      </button>
      <Link
        to="/"
        type="button"
        className="mb-2 mt-4 w-full rounded-md bg-slate-500 p-4 text-center text-lg font-bold text-white shadow-inner hover:bg-slate-400"
      >
        Back
      </Link>
    </form>
  );
};

export default SignUpForm;
