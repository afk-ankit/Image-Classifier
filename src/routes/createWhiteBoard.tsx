import { CreateWhiteBoard } from "@/components/CreateWhiteBoard";
import { WithAuth } from "@/components/WithAuth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/createWhiteBoard")({
  component: () => (
    <WithAuth>
      <CreateWhiteBoard />
    </WithAuth>
  ),
});
