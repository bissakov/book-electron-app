import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faAngleRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface ButtonProps {
  to: string;
  value: string;
}

const Button = ({ to, value }: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      to={to}
      className="hover:shadow-sm my-4 w-1/2 rounded-md bg-slate-100 py-3 text-center text-lg font-bold text-slate-900 hover:underline hover:underline-offset-8 hover:shadow-slate-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {value}{" "}
      {isHovered ? (
        <FontAwesomeIcon icon={faArrowRight} fixedWidth />
      ) : (
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      )}
    </Link>
  );
};

const WelcomePage = () => {
  return (
    <div className="shadow-lg mx-auto flex w-full max-w-sm overflow-hidden rounded-lg shadow-gray-700 dark:bg-gray-800 lg:max-w-4xl">
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{
          backgroundImage: "url('public/welcome-cover.jpg')",
        }}
      ></div>
      <div className="flex h-96 w-1/2 flex-col items-center justify-center">
        <h1 className="mb-8 w-full items-center text-center text-4xl font-bold text-white">
          Welcome!
        </h1>
        <Button to="/signup" value="Sign Up" />
        <Button to="/signin" value="Sign In" />
      </div>
    </div>
  );
};

export default WelcomePage;
