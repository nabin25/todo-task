import { useNavigate } from "react-router-dom";
import ThemeToggler from "../theme/ThemeToggler";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="bg-white/50 dark:bg-black/50 backdrop-blur-sm text-white p-4 fixed w-full top-0 left-0 z-10 px-4 md:px-10 drop-shadow-lg shadow-[0_4px_10px_rgba(255,101,30,0.5)]">
        <div className="w-full flex justify-between items-centers">
          <div className="flex items-center justify-start gap-2">
            <div
              className="text-xl font-bold text-black dark:text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6013] to-[#ffc4a7] font-bold">
                Todo Dashboard
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6">
            <ThemeToggler />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
