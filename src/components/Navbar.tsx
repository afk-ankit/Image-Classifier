import { Link } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <header className="container py-4">
      <nav className="flex items-center justify-end gap-4">
        <Link className="" to="/classifier">
          Image Classifier
        </Link>
        <Link className="" to="/whiteboard">
          Whiteboard
        </Link>
        <Link to="/socket">Socket</Link>
        <ModeToggle />
      </nav>
    </header>
  );
};

export default Navbar;
