import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import PlantCardList from "../components/PlantCardList.tsx";
import { getPlantListOpts } from "../queries.ts";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={"AppContainer"}>
      <Link className={"primary"} to={"/add"}>
        + Neue Pflanze
      </Link>
      <PlantCardListLoader />
    </div>
  );
}

// Eigene Komponente, weil wir später <Suspense />-Boundary darum legen wollen
//
// Diskutieren:
//  - warum (nicht) in PlantCardList die Daten laden 🤔
function PlantCardListLoader() {
  const { data: plants } = useSuspenseQuery(getPlantListOpts());

  return <PlantCardList plants={plants} />;
}
