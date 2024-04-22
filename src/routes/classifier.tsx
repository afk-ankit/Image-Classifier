import { createFileRoute } from "@tanstack/react-router";
import ImageClassifierPage from "@/ImageClassifierPage";
import { WithAuth } from "@/components/WithAuth";
export const Route = createFileRoute("/classifier")({
  component: () => (
    <WithAuth>
      <ImageClassifierPage />
    </WithAuth>
  ),
});
