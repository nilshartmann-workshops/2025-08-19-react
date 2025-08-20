import ky from "ky";
import { Plant } from "./types.ts";
import { queryOptions } from "@tanstack/react-query";

// const plantQueryKeys = {
//   singlePlant(plantId: string) { return [] },
//   plantList(orderBy: string)  { return [] },
// }


export function getPlantListOpts(orderBy: "id"| "name"| "lastWatered" = "id") {
  return queryOptions({
    queryKey: ["plants", "list", {orderBy}],
    async queryFn() {
      const response = await ky
        .get("http://localhost:7200/api/plants?orderBy=" + orderBy + "&slow=20")
        .json();

      const plants = Plant.array().parse(response);
      return plants;
    }
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