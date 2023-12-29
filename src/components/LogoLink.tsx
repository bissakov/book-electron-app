import { NavLink } from "react-router-dom";

const LogoLink: React.FC = () => {
  return (
    <NavLink
      to="/"
      className="cursor-pointer text-xl font-bold transition-colors duration-200 hover:text-gray-500 hover:dark:text-gray-400"
    >
      MyBookApp
    </NavLink>
  );
};

export default LogoLink;
