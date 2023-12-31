import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (query: string) => void;
}

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: SearchBarProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Input
        className="w-64"
        placeholder="Search books"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button
        className="px-2 py-1"
        type="submit"
        onClick={() => handleSearch(searchQuery)}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
