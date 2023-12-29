import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../@/components/ui/dropdown-menu";
import { Button } from "../@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import Review from "./Review";
import { useParams } from "react-router-dom";

interface Review {
  userId: string;
  bookId: string;
  rating: number;
  username: string;
  userImageUrl: string;
  reviewId: string;
  reviewText: string;
  likeCount: number;
  createdAt: string;
}

interface ReviewData {
  page: number;
  pageSize: number;
  totalReviews: number;
  totalPages: number;
  reviews: Review[];
}

const UserReviews = () => {
  const [reviews, setReviews] = useState<ReviewData | null>(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const bookParams = useParams();
  console.log(bookParams);
  const bookId = bookParams?.bookId || 1;

  console.log(bookId);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/reviews?bookId=${bookId}&page=${1}&pageSize=${3}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setReviewsLoading(false);
      }
    };
    fetchReviews();
  }, [bookId]);

  return (
    <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Reviews</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="shrink-0 transition-colors duration-200 hover:bg-gray-100"
              variant="outline"
            >
              <ArrowUpDownIcon className="mr-2 h-4 w-4" />
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuRadioGroup value="date">
              <DropdownMenuRadioItem
                className="transition-colors duration-200 hover:bg-gray-100"
                value="date"
              >
                Date
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                className="transition-colors duration-200 hover:bg-gray-100"
                value="likes"
              >
                Likes
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {reviews?.reviews.map((review) => (
        <Review
          username={review.username}
          userImageUrl={review.userImageUrl}
          rating={review.rating}
          reviewText={review.reviewText}
          likesCount={review.likeCount}
          createdAt={review.createdAt}
        />
      ))}
    </div>
  );
};

export default UserReviews;
