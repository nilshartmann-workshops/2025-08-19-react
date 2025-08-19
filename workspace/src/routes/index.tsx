import { createFileRoute, Link } from "@tanstack/react-router";
import PlantCardList from "../components/PlantCardList.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";
import { Plant } from "../types.ts";
import { getPlantListOpts } from "../queries.ts";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={"AppContainer"}>
      <Link
        className={"primary"}
        to={"/add"}>+ Neue Pflanze</Link>

      <PlantCardListLoader />

    </div>
  );
}

function PlantCardListLoader() {
  const {data: plants} = useSuspenseQuery(
    getPlantListOpts()
  );

  return <PlantCardList plants={plants} />
}
