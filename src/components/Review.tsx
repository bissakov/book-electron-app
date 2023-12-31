import { CardContent, Card } from "@/components/ui/card";
import { ThumbsUpIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Rating from "components/Rating";

interface ReviewProps {
  username: string;
  userImageUrl: string;
  rating: number;
  reviewText: string;
  likesCount: number;
  createdAt: string;
}

const Review = ({
  username,
  userImageUrl,
  rating,
  reviewText,
  likesCount,
  createdAt,
}: ReviewProps) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(parseInt(createdAt, 10));
  const reviewDate = `${
    months[date.getUTCMonth()]
  } ${date.getUTCDay()} ${date.getUTCFullYear()}`;

  return (
    <Card className="cursor-pointer transition-shadow duration-200 hover:shadow-lg">
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-9 w-9 transition-opacity duration-200 hover:opacity-80">
              <AvatarImage alt="User avatar" src={userImageUrl} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <h2 className="cursor-pointer text-lg font-semibold transition-colors duration-200 hover:text-gray-600">
              {username}
            </h2>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <ThumbsUpIcon className="h-4 w-4 cursor-pointer transition-colors duration-200 hover:fill-primary" />
              <p className="text-sm text-gray-500">{likesCount} likes</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500">Reviewed on {reviewDate}</p>
          <Rating rating={rating} />
        </div>
        <p className="text-secondary-foregound mt-2 cursor-pointer text-base transition-colors duration-200">
          {reviewText}
        </p>
      </CardContent>
    </Card>
  );
};

export default Review;
