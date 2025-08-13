import "./index.css";
import "./setup-dayjs.ts";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";

import { plantManagerRouter, queryClient } from "./create-router.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={plantManagerRouter} />
    {/*<ReactQueryDevtools />*/}
  </QueryClientProvider>,
);
