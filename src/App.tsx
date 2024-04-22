import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";
import axios from "axios";
import { useUserStore } from "./Store";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const addUser = useUserStore((state) => state.addUser);
  useEffect(() => {
    const getToken = async (url: string, token: string) => {
      try {
        const res = await axios.post(url, { token });
        const user = res.data;
        addUser(user.username, user.email);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    };
    const token = localStorage.getItem("token");
    if (token) {
      getToken(`${import.meta.env.VITE_BACKEND_URL}/verify`, token);
    }
  }, [addUser]);
  return <RouterProvider router={router} />;
};
export default App;
