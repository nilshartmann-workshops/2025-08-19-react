import { createFileRoute, Link } from "@tanstack/react-router";
import PlantCardList from "../components/PlantCardList.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";
import { Plant } from "../types.ts";
import { getPlantListOpts } from "../queries.ts";
import { z } from "zod/v4";

const RouteSearchParams = z.object({
  orderBy: z.enum(["id", "name", "lastWatered"]).optional(),
});

export const Route = createFileRoute("/")({
  component: RouteComponent,
  validateSearch: RouteSearchParams
});

function RouteComponent() {
  return (
    <div className={"AppContainer"}>
      <Link
        className={"primary"}
        to={"/add"}>+ Neue Pflanze</Link>

      <div className={"SortButtons"}>
        <Link
          to={"/"}
          search={{ orderBy: "id" }}
          activeProps={{ className: "active" }}
        >
          Id
        </Link>
        <Link
          to={"/"}
          activeProps={{ className: "active" }}
          search={{
            orderBy: "name",
          }}
        >
          Name
        </Link>
        <Link
          to={"/"}
          activeProps={{ className: "active" }}
          search={{
            orderBy: "lastWatered",
          }}
        >
          Last Watered
        </Link>
      </div>


      <PlantCardListLoader />

    </div>
  );
}

function PlantCardListLoader() {
  const {orderBy} = Route.useSearch();
  const {data: plants} = useSuspenseQuery(
    getPlantListOpts(orderBy)
  );

  return <PlantCardList plants={plants} />
}
