import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "9", 10);

  // const maxPage = totalPages > 5 ? 5 : totalPages;
  const displayRange = 5;
  const rangeStart = Math.max(1, currentPage - Math.floor(displayRange / 2));
  const rangeEnd = Math.min(totalPages, rangeStart + displayRange - 1);

  const pageNumbers = [];
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <Link
        to={`/search?query=${query}&page=${
          currentPage === 1 ? currentPage : currentPage - 1
        }&pageSize=${pageSize}`}
      >
        <Button className="border-2 bg-secondary text-secondary-foreground shadow-lg hover:text-secondary">
          <ArrowBackIcon />
        </Button>
      </Link>
      {pageNumbers.map((page) => (
        <Link
          to={`/search?query=${query}&page=${page}&pageSize=${pageSize}`}
          key={page}
        >
          {currentPage === page ? (
            <Button className="border-2 bg-gray-300 text-secondary-foreground shadow-lg hover:text-secondary dark:bg-gray-600">
              {page}
            </Button>
          ) : (
            <Button className="border-2 bg-secondary text-secondary-foreground shadow-lg hover:text-secondary">
              {page}
            </Button>
          )}
        </Link>
      ))}
      {totalPages > 5 ? (
        <>
          <p>...</p>
          <Link
            to={`/search?query=${query}&page=${totalPages}&pageSize=${pageSize}`}
          >
            <Button className="border-2 bg-secondary text-secondary-foreground shadow-lg hover:text-secondary">
              {totalPages}
            </Button>
          </Link>
        </>
      ) : null}
      <Link
        to={`/search?query=${query}&page=${
          currentPage === totalPages ? currentPage : currentPage + 1
        }&pageSize=${pageSize}`}
      >
        <Button className="border-2 bg-secondary text-secondary-foreground shadow-lg hover:text-secondary">
          <ArrowForwardIcon />
        </Button>
      </Link>
    </div>
  );
};

export default Pagination;
