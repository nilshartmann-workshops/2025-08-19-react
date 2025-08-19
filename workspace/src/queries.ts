import ky from "ky";
import { Plant } from "./types.ts";
import { queryOptions } from "@tanstack/react-query";

export function getPlantListOpts() {
  return queryOptions({
    queryKey: ["plants", "list"],
    async queryFn() {
      const response = ky
        .get("http://localhost:7200/api/plants")
        .json<Plant[]>();
      return response;
    }
  })
}

export function getPlantByIdOpts(plantId: string) {
  return queryOptions({
    queryKey: ["plants", "details", plantId],
    async queryFn() {
      const response = ky
        .get("http://localhost:7200/api/plants/" + plantId)
        .json<Plant>();
      return response;
    }
  })
}