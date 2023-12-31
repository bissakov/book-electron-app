import { Skeleton } from "@/components/ui/skeleton";

interface SidebarProps {
  genres: string[];
  setActiveGenre: (genre: string) => void;
  numberOfGenres: number;
  isGenresLoading: boolean;
}

const Sidebar = ({
  genres,
  setActiveGenre,
  numberOfGenres,
  isGenresLoading,
}: SidebarProps) => {
  // const isGenresLoading2 = true;
  return (
    <div className="sticky top-16 h-[calc(100vh-64px)] border-r bg-gray-100/40 dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-1 py-4">
        {Array.from({ length: numberOfGenres }).map((_, idx) =>
          !isGenresLoading ? (
            <div
              className="my-2 flex animate-pulse cursor-pointer items-center rounded-lg px-4 text-sm font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              onClick={() =>
                !isGenresLoading ? setActiveGenre(genres[idx]) : null
              }
            >
              {genres[idx]}
            </div>
          ) : (
            <Skeleton
              key={idx}
              className="mx-4 my-2 flex h-5 items-center rounded-lg px-3 py-2"
            />
          ),
        )}
      </div>
    </div>
  );
};

export default Sidebar;
