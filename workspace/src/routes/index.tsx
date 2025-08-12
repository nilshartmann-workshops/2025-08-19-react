import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { z } from "zod/v4";

import PlantCardList from "../components/PlantCardList.tsx";
import PlantCardListPlaceholder from "../components/PlantCardListPlaceholder.tsx";
import { getPlantListOpts } from "../queries.ts";

const RouteSearchParams = z.object({
  orderBy: z.enum(["id", "name", "lastWatered"]).optional(),
});

export const Route = createFileRoute("/")({
  component: RouteComponent,
  validateSearch: RouteSearchParams,
});

function RouteComponent() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <div className={"AppContainer"}>
      <Link className={"primary"} to={"/add"}>
        + Neue Pflanze
      </Link>
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
      <ErrorBoundary FallbackComponent={MyErrorBoundary} onReset={reset}>
        <Suspense fallback={<PlantCardListPlaceholder />}>
          <PlantCardListLoader />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function MyErrorBoundary(props: FallbackProps) {
  return (
    <div className={"PlantCard"}>
      <header>
        <h2>Fehler!</h2>
      </header>
      <div>{props.error.toString()}</div>
      <section>
        <button
          type={"button"}
          className={"primary"}
          onClick={() => props.resetErrorBoundary()}
        >
          Retry!
        </button>
      </section>
    </div>
  );
}

// Eigene Komponente, weil wir später <Suspense />-Boundary darum legen wollen
//
// Diskutieren:
//  - warum (nicht) in PlantCardList die Daten laden 🤔
function PlantCardListLoader() {
  const { orderBy } = Route.useSearch();
  const { data: plants, isRefetching } = useSuspenseQuery(
    getPlantListOpts(orderBy),
  );

  return (
    <div>
      {isRefetching && "Refetching..."}
      <PlantCardList plants={plants} />
    </div>
  );
}
