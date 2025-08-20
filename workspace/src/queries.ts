import ky from "ky";
import { Plant } from "./types.ts";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

// const plantQueryKeys = {
//   singlePlant(plantId: string) { return [] },
//   plantList(orderBy: string)  { return [] },
// }


export function getPlantListOpts(orderBy: "id"| "name"| "lastWatered" = "id") {
  return queryOptions({
    queryKey: ["plants", "list", {orderBy}],
    async queryFn() {
      const response = await ky
        .get("http://localhost:7200/api/plants?orderBy=" + orderBy + "&slow=10")
        .json();

      const plants = Plant.array().parse(response);
      return plants;
    },
    staleTime: 20000,
    refetchInterval: 1000,

  })
}

export function getPlantByIdOpts(plantId: string) {
  return queryOptions({
    queryKey: ["plants", "details", plantId],
    async queryFn() {
      const response = await ky
        .get("http://localhost:7200/api/plants/" + plantId)
        .json();
      const plant = Plant.parse(response);
      return plant;
    }
  })
}

export function getRandomQuoteOpts() {
  return queryOptions({
    queryKey: ["random-quote"],
    async queryFn() {
      return ky.get("http://localhost:7200/api/random-quote?slow=10")
        .json<string>()
    }
  })
}

export function useMutateLastWatered(plantId: string) {

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["UPDATE LAST WATERED", plantId],
    async mutationFn(lastWatered: string) {
      const response = await ky.put(
        "http://localhost:7200/api/plants/" + plantId + "/lastWatered",
        {
          json: {
            lastWatered: lastWatered,
          },
        },
      ).json();

      return Plant.parse(response);
    },
    // onMutate() {
    //   return "....";
    // },
    onSuccess(updatedPlant) {
      queryClient.setQueryData(
        getPlantByIdOpts(plantId).queryKey,
        updatedPlant
      )
    }
  })
}