import { ModeToggle } from "../@/components/ui/mode-toggle";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "./SearchBar";
import UserProfileDropdown from "./UserProfileDropdown";
import LogoLink from "./LogoLink";
import { Button } from "../@/components/ui/button";

interface HeaderProps {
  email: string | undefined;
  email_verified: boolean | undefined;
  name: string | undefined;
  nickname: string | undefined;
  picture: string | undefined;
}

const Header = ({ nickname, picture }: HeaderProps) => {
  const { logout } = useAuth0();

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (searchQuery: string) => {
    navigate({
      pathname: "/search",
      search: createSearchParams({
        query: searchQuery,
        page: "1",
        pageSize: "9",
      }).toString(),
    });
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-700 dark:bg-gray-800">
      <LogoLink />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <div className="flex items-center gap-4">
        <Button className="px-2 py-1" variant="link">
          <Link to="/recommendations">Recommendations</Link>
        </Button>
        <ModeToggle />
        <UserProfileDropdown
          nickname={nickname}
          picture={picture}
          logout={logout}
        />
      </div>
    </header>
  );
};

export default Header;
