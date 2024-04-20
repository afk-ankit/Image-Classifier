import { createFileRoute } from "@tanstack/react-router";
import { SocketIo } from "@/components/SocketIo";

export const Route = createFileRoute("/socket")({
  component: () => <SocketIo />,
});

