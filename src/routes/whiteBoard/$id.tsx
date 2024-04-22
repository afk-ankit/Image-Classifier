import { WhiteBoard } from "@/components/WhiteBoard";
import { WithAuth } from "@/components/WithAuth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/whiteBoard/$id")({
  validateSearch: (search: Record<string, unknown>): { user: string } => {
    return {
      user: search.user as string,
    };
  },
  component: () => (
    <WithAuth>
      <WhiteBoard />
    </WithAuth>
  ),
});
