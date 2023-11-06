// import { useState } from "react";
// import { FormInputProps, SignUpFormProps } from "./types/types";

// const SignUpFormInput = ({
//   name,
//   label,
//   placeholder,
//   onChange,
//   value,
// }: FormInputProps) => {
//   return (
//     <div className="flex w-full flex-col">
//       <label className="p-2">{label}</label>
//       <input
//         className="rounded-md border-2 border-solid border-purple-950 p-2 focus:border-purple-500 focus:outline-none"
//         name={name}
//         placeholder={placeholder}
//         onChange={onChange}
//         value={value}
//       />
//     </div>
//   );
// };

// const SignUpForm = ({ onBack }: SignUpFormProps) => {
//   const [values, setValues] = useState({
//     username: "",
//     email: "",
//     birthday: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const inputs = [
//     {
//       id: 1,
//       name: "username",
//       type: "text",
//       placeholder: "Username",
//       label: "Username",
//       errorMessage: `Username should be at least 6 characters long with
//                     no spaces or special characters...`,
//       required: true,
//     },
//     {
//       id: 2,
//       name: "email",
//       type: "text",
//       placeholder: "Email",
//       label: "Email",
//       errorMessage: "Email should be a valid email address...",
//       required: true,
//     },
//     {
//       id: 3,
//       name: "password",
//       type: "password",
//       placeholder: "Password",
//       label: "Password",
//       errorMessage: `Password should be at least 8 characters long, 
//                     with at least one uppercase letter, one lowercase letter,
//                     one number, and one special character...`,
//       required: true,
//     },
//     {
//       id: 4,
//       name: "confirmPassword",
//       type: "password",
//       placeholder: "Confirm Password",
//       label: "Confirm Password",
//       errorMessage: "Passwords do not match...",
//       required: true,
//     },
//   ];

//   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setValues({ ...values, [event.target.name]: event.target.value });
//     console.log({ [event.target.name]: event.target.value });
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//   };

//   return (
//     <form
//       className="w-96 rounded-lg bg-white px-8 py-4 shadow-2xl"
//       onSubmit={handleSubmit}
//     >
//       <div className="mb-4 text-center text-3xl font-bold text-purple-900">
//         Sign-Up
//       </div>
//       {inputs.map((input) => (
//         <SignUpFormInput
//           key={input.id}
//           {...input}
//           value={values[input.name as keyof typeof values]}
//           onChange={onChange}
//         />
//       ))}
//       <button className="pointer-events-auto mb-2 mt-4 w-full rounded-md bg-purple-900 p-4 text-lg font-bold text-white hover:bg-purple-800">
//         Submit
//       </button>
//       <button
//         type="button"
//         className="mb-2 mt-4 w-full rounded-md bg-gray-500 p-4 text-lg font-bold text-white hover:bg-gray-400"
//         onClick={onBack}
//       >
//         Back
//       </button>
//     </form>
//   );
// };

// const WelcomePage = ({ onContinue }: { onContinue: () => void }) => {
//   return (
//     <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-tr from-violet-500 to-fuchsia-500">
//       <h1 className="mb-4 text-4xl font-bold text-white">Welcome!</h1>
//       <p className="mb-8 text-xl text-white">Click the button to sign up</p>
//       <button
//         className="rounded-md bg-purple-900 px-6 py-3 text-lg font-bold text-white hover:bg-purple-800"
//         onClick={onContinue}
//       >
//         Continue to Sign Up
//       </button>
//     </div>
//   );
// };

// const App: React.FC = () => {
//   const [showSignUp, setShowSignUp] = useState(false);

//   const handleContinue = () => {
//     setShowSignUp(true);
//   };

//   const handleBack = () => {
//     setShowSignUp(false);
//   };

//   return showSignUp ? (
//     <div className="flex h-screen items-center justify-center bg-gradient-to-tr from-violet-500 to-fuchsia-500 bg-cover bg-center">
//       <SignUpForm onBack={handleBack} />
//     </div>
//   ) : (
//     <WelcomePage onContinue={handleContinue} />
//   );
// };

// export default App;
