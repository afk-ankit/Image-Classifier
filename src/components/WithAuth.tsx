import { useUserStore } from "@/Store";
import { useNavigate } from "@tanstack/react-router";
import { ReactNode } from "react";

export const WithAuth = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.username);
  const email = useUserStore((state) => state.email);
  if (!user || !email) {
    navigate({ to: "/signin" });
    return;
  }
  return <>{children}</>;
};
