import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { RouterProvider } from "@tanstack/react-router";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
