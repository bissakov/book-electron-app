import { Link } from "react-router-dom";
import { CardContent, Card } from "@/components/ui/card";
import Rating from "components/Rating";

interface BookCardProps {
  bookId: number;
  title: string;
  authorName: string;
  description: string;
  rating: number;
  coverUrl: string;
}

const BookCard = ({
  bookId,
  title,
  authorName,
  description,
  rating,
  coverUrl,
}: BookCardProps) => {
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    (e.target as HTMLImageElement).src = "placeholder_cover.jpg";
  };

  return (
    <Link to={`/books/${bookId}`} className="cursor-none">
      <Card>
        <CardContent className="flex gap-4 p-4">
          <img
            alt="Book Cover"
            className="h-36 w-28 cursor-pointer rounded-md object-cover"
            height="200"
            src={coverUrl}
            style={{
              aspectRatio: "150/200",
              objectFit: "cover",
            }}
            width="150"
            onError={handleImageError}
          />
          <div>
            <h2 className="line-clamp-1 cursor-pointer text-lg font-semibold">
              {title}
            </h2>
            <p className="line-clamp-1 cursor-pointer text-gray-500">
              {authorName}
            </p>
            <p className="mt-2 line-clamp-3 cursor-pointer text-sm text-gray-400">
              {description}
            </p>
            <Rating rating={rating} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookCard;
