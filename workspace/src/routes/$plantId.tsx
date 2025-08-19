import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPlantByIdOpts } from "../queries.ts";
import PlantDetailsCard from "../components/PlantDetailsCard.tsx";

export const Route = createFileRoute('/$plantId')({
  component: RouteComponent,
})

function RouteComponent() {
  const {plantId} = Route.useParams();

  return <PlantDetailsCard plantId={plantId} />
}
