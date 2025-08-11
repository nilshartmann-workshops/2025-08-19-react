import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={"AppContainer"}>
      <Link className={"primary"} to={"/add"}>
        + Neue Pflanze
      </Link>

      <Link to={"/$plantId"} params={{ plantId: "1" }}>
        Plant one
      </Link>
    </div>
  );
}
