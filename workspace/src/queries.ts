import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import _ky from "ky";

import { Plant } from "./types.ts";

export const ky = _ky.extend({
  // retries im Fehlerfall besser über TanStack Query machen
  // (kann in der QueryClient-Konfiguration angepasst werden)
  retry: 0,
});

// Prinzipiell brauchen wir keine FUNKTION (Konstante würde reichen)
//   aber wir erweitern das noch
// ⚠️ Der Weg, wie wir hier Daten laden und mit den Daten umgehen ist stark vereinfacht
//   - keine Fehlerbehandlung
//   - kein Loadingindikator bei lang laufenden Requests
//   - keine Validierung der Daten
//   ✅ was müssen wir machen, wenn wir den Query woanders verwenden wollen?
//   ✅ was passiert, wenn wir die Backend URL anpassen müssen (z.B. je nach Deployment)

export const getPlantListOpts = (
  orderBy: "id" | "name" | "lastWatered" = "id",
) =>
  queryOptions({
    queryKey: ["plants", "list", { orderBy }],
    async queryFn() {
      const searchParams = new URLSearchParams({ orderBy });
      // searchParams.set("slow", "2400");
      const response = await ky
        .get("http://localhost:7200/api/plants?" + searchParams)
        .json();
      return Plant.array().parse(response);
    },
  });

export const getPlantOpts = (plantId: string) =>
  queryOptions({
    queryKey: ["plants", "details", plantId],
    async queryFn() {
      const response = await ky
        .get("http://localhost:7200/api/plants/" + plantId)
        .json();
      return Plant.parse(response);
    },
  });

export const useWaterPlantMutation = (plantId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(lastWatered: string) {
      const result = await ky
        .put(
          `http://localhost:7200/api/plants/${plantId}/lastWatered?slow=1400`,
          {
            json: {
              lastWatered,
            },
          },
        )
        .json();

      const updatedPlant = Plant.parse(result);
      return updatedPlant;
    },
    onSuccess(plant) {
      queryClient.setQueryData(getPlantOpts(plantId).queryKey, plant);
      queryClient.invalidateQueries({ queryKey: ["plants", "list"] });
    },
  });
};

type PlantFormState = {
  name: string;
  location: string;
  wateringInterval: number;
  lastWatered?: string;
};

export const useAddPlantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: PlantFormState) {
      const response = await ky
        .post("http://localhost:7200/api/plants", {
          json: data,
        })
        .json();
      const newPlant = Plant.parse(response);
      return newPlant;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["plants", "list"] });
    },
  });
};
