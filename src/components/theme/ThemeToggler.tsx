import { useContext } from "react";
import { ThemeContext } from "../../providers/ThemeProvider";
import DarkIcon from "../icons/DarkIcon";
import LightIcon from "../icons/LightIcon";

const ThemeToggler = () => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <button
        className="w-10 h-10 flex justify-center items-center rounded-md bg-gray-200 dark:bg-gray-600 hover:cursor-pointer"
        onClick={() => theme?.toggleTheme()}
      >
        {theme?.theme === "dark" ? (
          <DarkIcon className="w-8 h-8" />
        ) : (
          <LightIcon className="w-6 h-6" />
        )}
      </button>
    </>
  );
};

export default ThemeToggler;
