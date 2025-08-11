import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={"AppContainer"}>
      <h1 className={"AppHeader"}>🌱 Hello React 👋 </h1>
    </div>
  );
}
