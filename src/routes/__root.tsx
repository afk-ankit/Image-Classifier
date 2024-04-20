import Navbar from "@/components/Navbar";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <main className="container grid min-h-[80dvh] place-items-center pb-4">
        <Outlet />
      </main>
    </>
  ),
});
