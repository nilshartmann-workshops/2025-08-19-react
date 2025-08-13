// In größeren Anwendungen mit diversen Testfällen in eigenes Modul
//   auslagern
import { QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { afterEach, beforeAll, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { createQueryClient } from "../create-query-client.tsx";
import { Plant } from "../types.ts";
import PlantDetailsCard from "./PlantDetailsCard.tsx";

// vi.mock("./date-utils.ts", async (importOriginal) => {
//   return {
//     ...(await importOriginal<typeof import("./date-utils.ts")>()),
//     getTodayString() {
//       return "2025-08-15";
//     },
//   };
// });
vi.mock("dayjs", () => {
  return function () {
    return {
      format() {
        return "2025-08-15";
      },
    };
  };
});
const plant: Plant = {
  id: "1",
  name: "Aloe Vera",
  location: "Schlafzimmer",
  wateringInterval: 12,
  lastWatered: "2025-06-16",
};

const worker = setupWorker(
  http.get("http://localhost:7200/api/plants/1", async ({ request }) => {
    return HttpResponse.json(plant);
  }),
  http.put<never, { lastWatered: string }>(
    "http://localhost:7200/api/plants/1/lastWatered",
    async ({ request }) => {
      const body = await request.json(); // Post
      console.log("BODY", body);
      const lastWatered = body.lastWatered;
      return HttpResponse.json({ ...plant, lastWatered });
    },
  ),
);

beforeAll(async () => await worker.start());
afterEach(() => worker.resetHandlers());

test("Updates lastWatered and refreshes the ui", async () => {
  const screen = render(
    <QueryClientProvider client={createQueryClient()}>
      <PlantDetailsCard plantId={"1"} />
    </QueryClientProvider>,
  );

  // await expect
  //   .element(screen.getByText(/Pflanzen werden geladen/))
  //   .toBeInTheDocument();
  await expect.element(screen.getByText(/Aloe Vera/)).toBeInTheDocument();
  await screen.getByRole("button", { name: /gießen/i }).click();
  await expect
    .element(screen.getByText(/Zuletzt gegossen.*15.8.2025/i))
    .toBeInTheDocument();
});
