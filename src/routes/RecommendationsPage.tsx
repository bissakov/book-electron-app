import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "components/BookCard";
import Pagination from "components/Pagination";

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

const RecommendationsPage = () => {
  const [recommendationsResults, setRecommendationsResults] =
    useState<SeachType | null>(null);
  const [recommendationsLoading, setRecommendationsLoading] = useState(true);

  const [recommendationsParams] = useSearchParams();
  const page = recommendationsParams.get("page") || 1;
  const pageSize = recommendationsParams.get("pageSize") || 9;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/recommendations?userId=${1}page=${page}&pageSize=${pageSize}`,
          {
            method: "POST",
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecommendationsResults(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setRecommendationsLoading(false);
      }
    };
    fetchSearchResults();
  }, [page, pageSize]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <h1 className="flex cursor-pointer items-center justify-between text-2xl font-bold">
        Personal Recommendations
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommendationsResults?.books.map((book) => (
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
      <Pagination totalPages={recommendationsResults?.totalPages || 1} />
    </main>
  );
};

export default RecommendationsPage;
