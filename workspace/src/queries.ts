import { queryOptions } from "@tanstack/react-query";
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

export const getPlantListOpts = () =>
  queryOptions({
    queryKey: ["plants", "list"],
    async queryFn() {
      const response = await ky
        .get("http://localhost:7200/api/plants")
        .json<Plant[]>();
      return response;
    },
  });

export const getPlantOpts = (plantId: string) =>
  queryOptions({
    queryKey: ["plants", "details", plantId],
    async queryFn() {
      const response = await ky
        .get("http://localhost:7200/api/plants/" + plantId)
        .json<Plant>();
      return response;
    },
  });
