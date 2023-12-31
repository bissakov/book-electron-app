import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ui/theme-provider";
import { Toggle } from "@/components/ui/toggle";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Toggle
      onClick={() =>
        localStorage.getItem("vite-ui-theme") == "dark"
          ? setTheme("light")
          : setTheme("dark")
      }
      className="transition-colors duration-200 hover:bg-gray-100"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </Toggle>
  );
}
