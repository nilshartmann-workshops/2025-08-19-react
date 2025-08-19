import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext, Link,
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
    <div className={"AppLayout h-svh overflow-y-scroll"}>
      <Link to={"/"}>
        Home
      </Link>
      <Outlet />
    </div>
  ),
});
