import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../../providers/theme";

interface ThemeTogglerProps {
  onClick: () => void;
}

export const ThemeToggler = ({ onClick }: ThemeTogglerProps) => {
  const { theme } = useTheme();

  return (
    <button
      className="flex justify-center items-center rounded-full size-8 bg-zinc-950 dark:bg-neutral-50 transition-all duration-500"
      onClick={onClick}
    >
      {theme === "light" ? (
        <MoonIcon className="size-6 text-neutral-50 dark:text-zinc-950" />
      ) : (
        <SunIcon className="size-6 text-neutral-50 dark:text-zinc-950" />
      )}
    </button>
  );
};
