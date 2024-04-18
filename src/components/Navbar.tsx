import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <header className="container py-2">
      <nav className="flex items-center justify-between">
        <h1 className="text-lg font-bold">Image Classifier</h1>
        <ModeToggle />
      </nav>
    </header>
  );
};

export default Navbar;
