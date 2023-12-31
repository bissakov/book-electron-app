import { useEffect, useState } from "react";
import Sidebar from "components/Sidebar";
import BookCard from "components/BookCard";

type Author = {
  authorId: number;
  authorName: string;
  imageUrl: string;
};

type Book = {
  bookId: number;
  title: string;
  author: Author;
  rating: number;
  coverUrl: string;
  description: string;
};

type BookGenreInformation = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalBooks: number;
  books: Book[];
};

const Home = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [isGenresLoading, setGenresLoading] = useState<boolean>(true);

  const [activeGenre, setActiveGenre] = useState<string>("");

  const [genreBooks, setGenreBooks] = useState<BookGenreInformation>();
  const [isGenreBooksLoading, setGenreBooksLoading] = useState<boolean>(true);

  const numberOfGenres = 20;

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    if (activeGenre) {
      fetchGenreBooks(activeGenre);
    }
  }, [activeGenre]);

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/genres/popular?limit=${numberOfGenres}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGenres(data);
      setActiveGenre(data[0]);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setGenresLoading(false);
    }
  };

  const fetchGenreBooks = async (genre: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/genres/books?genre=${genre}&pageSize=18`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGenreBooks(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setGenreBooksLoading(false);
    }
  };

  return (
    <>
      <div className="grid w-full grid-cols-[280px_1fr]">
        <Sidebar
          genres={genres}
          setActiveGenre={setActiveGenre}
          numberOfGenres={numberOfGenres}
          isGenresLoading={isGenresLoading}
        />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <h1 className="text-2xl font-bold">{activeGenre}</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(genreBooks?.books ?? []).map((book, idx) => (
              <BookCard
                key={idx}
                bookId={book.bookId}
                title={book.title}
                authorName={book.author.authorName}
                description={book.description}
                rating={book.rating}
                coverUrl={book.coverUrl}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
