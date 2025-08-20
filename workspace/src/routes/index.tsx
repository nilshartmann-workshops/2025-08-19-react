import { createFileRoute, Link } from "@tanstack/react-router";
import PlantCardList from "../components/PlantCardList.tsx";
import {
  keepPreviousData,
  useQuery,
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import ky from "ky";
import { Plant } from "../types.ts";
import { getPlantListOpts } from "../queries.ts";
import { z } from "zod/v4";
import { Suspense, useEffect, useState, useTransition } from "react";
import PlantCardListPlaceholder from "../components/PlantCardListPlaceholder.tsx";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

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
        <Link to={"/"} search={{ orderBy: "id" }} className={"link"}>
          Id
        </Link>
        <Link
          to={"/"}
          className={"link"}
          search={{
            orderBy: "name",
          }}
        >
          Name
        </Link>
        <Link
          className={"link"}
          to={"/"}
          search={{
            orderBy: "lastWatered",
          }}
        >
          Last Watered
        </Link>
      </div>

      <ErrorBoundary
        FallbackComponent={(props) => <MyErrorFallback {...props} />}
        onReset={reset}
      >
        <Suspense fallback={<PlantCardListPlaceholder />}>
          <PlantCardListLoader />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function MyErrorFallback(props: FallbackProps) {
  return (
    <div>
      <h1>Fehler!</h1>
      <h3>{props.error.toString()}</h3>
      <button className={"primary"} onClick={() => props.resetErrorBoundary()}>
        Noch mal propbieren!
      </button>
    </div>
  );
}

/*





 */

function PlantCardListLoader() {
  useEffect(() => {
    console.log("PlantcardList committed");
  });

  // console.log("PlantCardListLoader ", orderBy)

  const {orderBy} = Route.useSearch();
  const {
    data: plants,
    isRefetching,
  } = useSuspenseQuery({
    ...getPlantListOpts(orderBy),
  });


  return <div>
    {isRefetching && <div>Refetching data...</div>}
    <PlantCardList plants={plants} />
  </div>;
}

//
// function PlantCardListLoader({orderBy}: {orderBy: any}) {
//   // const {orderBy} = Route.useSearch();
//   const { data: plants,isLoading, isError, isFetching } = useQuery({
//     ...getPlantListOpts(orderBy),
//     placeholderData: keepPreviousData
//   });
//
//   if (isLoading) {
//     return <PlantCardListPlaceholder />
//   }
//
//   if (isError) {
//     return "...";
//   }
//
//   return <div>
//     {isFetching && <p>Data updating...</p>}
//     <PlantCardList plants={plants!} />
//   </div>
// }