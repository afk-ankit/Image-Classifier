import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Toaster />
    </>
  ),
});
