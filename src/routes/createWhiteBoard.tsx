import { CreateWhiteBoard } from "@/components/CreateWhiteBoard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/createWhiteBoard")({
  component: () => <CreateWhiteBoard />,
});
