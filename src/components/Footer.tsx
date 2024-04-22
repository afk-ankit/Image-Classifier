import { Button } from "./ui/button";

function Footer() {
  return (
    <>
      <hr />
      <footer className="container flex items-center justify-center p-3">
        <small className="text-sm"> Made with 💓 by</small>
        <Button asChild variant={"link"} className="pl-1">
          <a
            className="text-sm"
            href={"https://github.com/afk-ankit"}
            target="_blank"
          >
            afk-ankit
          </a>
        </Button>
      </footer>
    </>
  );
}

export default Footer;
