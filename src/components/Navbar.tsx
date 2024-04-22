import { Link } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <header className="px-2 py-4 shadow-sm sm:container ">
      <nav className="flex items-center justify-end gap-4">
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

        <ModeToggle />
      </nav>
    </header>
  );
};

export default Navbar;
