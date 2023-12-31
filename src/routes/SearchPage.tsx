import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "components/Pagination";
import BookCard from "components/BookCard";

type Author = {
  authorId: number;
  authorName: string;
  authorImage: string;
};

type BookCardType = {
  bookId: number;
  title: string;
  author: Author;
  description: string;
  rating: number;
  coverUrl: string;
};

type SeachType = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalBooks: number;
  books: BookCardType[];
};

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<SeachType | null>(null);
  const [searchResultsLoading, setSearchLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const page = searchParams.get("page") || 1;
  const pageSize = searchParams.get("pageSize") || 10;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/search/title?title=${query}&page=${page}&pageSize=${pageSize}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setSearchLoading(false);
      }
    };
    fetchSearchResults();
  }, [page, pageSize, query]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <h1 className="flex cursor-pointer items-center justify-between text-2xl font-bold">
        Search Results
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {searchResults?.books.map((book) => (
          <BookCard
            bookId={book.bookId}
            title={book.title}
            authorName={book.author.authorName}
            description={book.description}
            rating={book.rating}
            coverUrl={book.coverUrl}
          />
        ))}
      </div>
      <Pagination totalPages={searchResults?.totalPages || 1} />
    </main>
  );
};

export default SearchPage;
