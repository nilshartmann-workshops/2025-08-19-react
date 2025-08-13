import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Outlet,
  retainSearchParams,
} from "@tanstack/react-router";

type PlantManagerRouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<PlantManagerRouterContext>()({
  search: {
    middlewares: [retainSearchParams(true)],
  },
  component: () => (
    <div className={"AppLayout"}>
      <Outlet />
    </div>
  ),
});
