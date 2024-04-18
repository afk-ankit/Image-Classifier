import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <header className="container p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-lg font-bold">Image Classifier</h1>
        <ModeToggle />
      </nav>
    </header>
  );
};

export default Navbar;
