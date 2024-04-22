import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

const Home = () => {
  return (
    <section className="grid min-h-[80dvh] place-items-center p-2 sm:container">
      <div className="w-full space-y-8 sm:w-[750px]">
        <h1 className="text-center text-3xl font-semibold sm:text-5xl lg:text-6xl">
          THE NEXT GEN <br />
          <span className="tracking-wide text-green-500">
            COLLABORATION TOOL
          </span>
        </h1>
        <div className="m-auto flex flex-col justify-center gap-2 sm:max-w-[500px] sm:flex-row">
          <Button className="flex-1 font-bold" asChild>
            <Link to="/signin">Login</Link>
          </Button>
          <Button className="flex-1 font-bold" variant={"outline"} asChild>
            <Link to="/signup">Register</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Home;
