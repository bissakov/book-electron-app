import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StarIconProps {
  className?: string;
}

const StarIcon = (props: StarIconProps) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

interface RatingProps {
  rating?: number;
}

const Rating = ({ rating }: RatingProps) => {
  const wholeRating = Math.floor(rating || 0);

  return (
    <>
      <div className="w-fit">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="mt-2 flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((value) =>
                  value <= wholeRating ? (
                    <StarIcon key={value} className="h-5 w-5 fill-primary" />
                  ) : (
                    <StarIcon
                      key={value}
                      className="h-5 w-5 fill-muted stroke-muted-foreground"
                    />
                  ),
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Average rating: {rating}/5</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};

export default Rating;
