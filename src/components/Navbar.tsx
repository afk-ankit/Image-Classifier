import { Link } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";
import { useUserStore } from "@/Store";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const username = useUserStore((state) => state.username);
  const removeUser = useUserStore((state) => state.removeUser);
  return (
    <header className="px-2 py-4 shadow-sm sm:container ">
      <nav className="hidden items-center justify-end gap-4 lg:flex">
        <Link
          className=""
          to="/createWhiteBoard"
          activeProps={{ className: "font-bold" }}
        >
          Whiteboard
        </Link>
        <Link
          className=""
          to="/classifier"
          activeProps={{ className: "font-bold" }}
        >
          Image Classifier
        </Link>
        {username && (
          <Link
            onClick={() => {
              removeUser();
              localStorage.setItem("token", "");
            }}
            to="/"
          >
            Logout
          </Link>
        )}
        <ModeToggle />
      </nav>
      <MobileNavbar />
    </header>
  );
};

export default Navbar;
