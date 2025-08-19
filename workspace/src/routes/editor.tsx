import { createFileRoute } from "@tanstack/react-router";

import PlantEditor from "@/components/PlantEditor.tsx";

export const Route = createFileRoute("/editor")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PlantEditor />;
}
