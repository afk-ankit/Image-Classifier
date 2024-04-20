import { createFileRoute } from "@tanstack/react-router";
import ImageClassifierPage from "@/ImageClassifierPage";
export const Route = createFileRoute("/classifier")({
  component: () => <ImageClassifierPage />,
});

