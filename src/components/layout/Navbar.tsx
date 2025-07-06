import { useNavigate } from "react-router-dom";
import ThemeToggler from "../theme/ThemeToggler";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useAuth } from "../../providers/AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  return (
    <>
      <nav className="bg-white/50 dark:bg-black/50 backdrop-blur-sm text-white p-4 fixed w-full top-0 left-0 z-10 px-4 md:px-10 drop-shadow-lg shadow-[0_4px_10px_rgba(255,101,30,0.5)]">
        <div className="w-full flex justify-between items-centers">
          <div className="flex items-center justify-start gap-2">
            <div
              className="text-xl font-bold text-black dark:text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r dark:from-[#ff6013] dark:to-[#ff9259] from-[#ff6013] to-[#ff874a] font-bold">
                Todo Dashboard
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6">
            <ThemeToggler />
            <Popover>
              <PopoverTrigger asChild>
                <img
                  src={user?.avatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </PopoverTrigger>
              <PopoverContent className="">
                <ul>
                  <li className="my-2">{user?.full_name}</li>
                  <hr />
                  <li className="my-2">{user?.email}</li>
                  <hr />
                  <Button
                    className="my-2"
                    onClick={() => logout()}
                    variant={"destructive"}
                  >
                    Log out
                  </Button>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
