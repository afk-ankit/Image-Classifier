import { WhiteBoard } from "@/components/WhiteBoard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/whiteboard")({
  component: () => <WhiteBoard />,
});

