import ky from "ky";
import { Plant } from "./types.ts";
import { queryOptions } from "@tanstack/react-query";

export function getPlantListOpts() {
  return queryOptions({
    queryKey: ["plants", "list"],
    async queryFn() {
      const response = await ky
        .get("http://localhost:7200/api/plants")
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