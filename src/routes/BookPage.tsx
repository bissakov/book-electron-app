import { CardContent, Card } from "../@/components/ui/card";
import Rating from "../components/Rating";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import UserReviews from "../components/UserReviews";

const RelatedBooks = () => {
  return (
    <div className="mt-8 flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Related Books</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <BookCard
          bookId={1}
          title={"The Hobbit"}
          authorName={"J.R.R. Tolkien"}
          description={
            "Bilbo Baggins, a hobbit, is smoking in his porchway one day when Gandalf the Wizard visits him. He wants Bilbo to help a group of dwarves take back the Mountain from Smaug, a dragon."
          }
          rating={4.5}
          coverUrl={"https://i.imgur.com/6NLw2tB.jpg"}
        />
        <BookCard
          bookId={1}
          title={"The Hobbit"}
          authorName={"J.R.R. Tolkien"}
          description={
            "Bilbo Baggins, a hobbit, is smoking in his porchway one day when Gandalf the Wizard visits him. He wants Bilbo to help a group of dwarves take back the Mountain from Smaug, a dragon."
          }
          rating={4.5}
          coverUrl={"https://i.imgur.com/6NLw2tB.jpg"}
        />
        <BookCard
          bookId={1}
          title={"The Hobbit"}
          authorName={"J.R.R. Tolkien"}
          description={
            "Bilbo Baggins, a hobbit, is smoking in his porchway one day when Gandalf the Wizard visits him. He wants Bilbo to help a group of dwarves take back the Mountain from Smaug, a dragon."
          }
          rating={4.5}
          coverUrl={"https://i.imgur.com/6NLw2tB.jpg"}
        />
      </div>
    </div>
  );
};

interface Author {
  authorId: string;
  authorName: string;
}

interface Book {
  bookId: string;
  title: string;
  author: Author;
  description: string;
  rating: number;
  coverUrl: string;
}

const BookPage = () => {
  const params = useParams();
  const bookId = params.bookId;

  const [book, setBook] = useState<Book | null>();
  const [isBookLoading, setBookLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/books/${bookId}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setBookLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    (e.target as HTMLImageElement).src = "placeholder_cover.jpg";
  };

  return (
    <main className="min-h-screen w-full p-4 md:p-6">
      <Card className="my-8 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
        <CardContent className="flex flex-col gap-4 p-4 md:flex-row">
          <img
            alt="Book Cover"
            className="h-96 w-full cursor-pointer rounded-md object-cover md:w-72"
            height="400"
            src={book?.coverUrl}
            style={{
              aspectRatio: "300/400",
              objectFit: "cover",
            }}
            width="300"
            onError={handleImageError}
          />
          <div className="flex flex-col gap-4">
            <h2 className="cursor-pointer text-3xl font-bold">{book?.title}</h2>
            <p className="text-secondary-foregound cursor-pointer text-lg">
              {book?.author?.authorName}
            </p>
            <Rating rating={book?.rating} />
            <p className="mt-2 cursor-pointer text-base text-secondary-foreground">
              {book?.description}
            </p>
          </div>
        </CardContent>
      </Card>
      <RelatedBooks />
      <UserReviews />
    </main>
  );
};

export default BookPage;
