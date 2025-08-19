import { createFileRoute, Link } from "@tanstack/react-router";
import PlantCardList from "../components/PlantCardList.tsx";
import {
  keepPreviousData,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import ky from "ky";
import { Plant } from "../types.ts";
import { getPlantListOpts } from "../queries.ts";
import { z } from "zod/v4";
import { Suspense, useEffect, useState, useTransition } from "react";
import PlantCardListPlaceholder from "../components/PlantCardListPlaceholder.tsx";

const RouteSearchParams = z.object({
  orderBy: z.enum(["id", "name", "lastWatered"]).optional(),
});

export const Route = createFileRoute("/")({
  component: RouteComponent,
  validateSearch: RouteSearchParams
});

function RouteComponent() {


  const [isLoading, startTransition] = useTransition();
  const [orderBy, setOrderBy] = useState<"id"|"name"|"lastWatered"|undefined>("id");

  console.log("ROUTE COMPONENT", orderBy)


  const handleOrderByClick = (newOrderBy: "id"|"name"|"lastWatered") => {
    startTransition( () => {
      setOrderBy(newOrderBy)
    })
  }

  return (
    <div className={"AppContainer"}>
      <Link
        className={"primary"}
        to={"/add"}>+ Neue Pflanze</Link>

      <button onClick={() => handleOrderByClick("id")}
              >Id</button>
      <button onClick={() => handleOrderByClick("name")}
      >Name</button>
      <button onClick={() => handleOrderByClick("lastWatered")}
      >lastWatered</button>

      <p>Sortierung nach: {orderBy}</p>

      {/*<div className={"SortButtons"}>*/}
      {/*  <Link*/}
      {/*    to={"/"}*/}
      {/*    search={{ orderBy: "id" }}*/}
      {/*    className={"link"}*/}
      {/*  >*/}
      {/*    Id*/}
      {/*  </Link>*/}
      {/*  <Link*/}
      {/*    to={"/"}*/}
      {/*    className={"link"}*/}
      {/*    search={{*/}
      {/*      orderBy: "name",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Name*/}
      {/*  </Link>*/}
      {/*  <Link*/}
      {/*    className={"link"}*/}
      {/*    to={"/"}*/}

      {/*    search={{*/}
      {/*      orderBy: "lastWatered",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Last Watered*/}
      {/*  </Link>*/}
      {/*</div>*/}
      {isLoading && <p>Loading!</p>}
      <Suspense fallback={<PlantCardListPlaceholder />}>
        <PlantCardListLoader orderBy={orderBy}/>
      </Suspense>

    </div>
  );
}

/*





 */

function PlantCardListLoader({orderBy}: {orderBy: any}) {

  useEffect(() => {
    console.log("PlantcardList committed")
  })

  // console.log("PlantCardListLoader ", orderBy)

  // const {orderBy} = Route.useSearch();
  const { data: plants,isLoading, isError, isFetching } = useSuspenseQuery({
    ...getPlantListOpts(orderBy),
  });

  console.log("NACH USE SUSPENSE QUERY", orderBy);

  return <PlantCardList plants={plants!} />
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