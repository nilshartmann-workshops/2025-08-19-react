import { createFileRoute } from "@tanstack/react-router";

import PlantForm from "../components/PlantForm.tsx";

export const Route = createFileRoute("/add")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PlantForm />;
}
